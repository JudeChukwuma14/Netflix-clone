import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMBD_BASE_URL } from "../utils/constants";

const initialState = {
  genres: [],
  movies: [],
  genresLoaded: false,
  loading: false,
  error: null,
};

// Async thunk to fetch genres
export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const { data } = await axios.get(
    `${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return data.genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchDataByGenres = createAsyncThunk(
  "netflix/moviesByGenres",
  async ({ genre, type }, thunkApi) => {
    try {
      const response = await getRawData(
        `${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        thunkApi.getState().netflix.genres,
        true
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenres.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenres.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default NetflixSlice.reducer;


// Configure the store
export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
