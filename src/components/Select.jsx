import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenres } from "../store";

export default function Select({ genres, type }) {
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const selectedGenre = e.target.value;
    
    dispatch(fetchDataByGenres({ genre: selectedGenre, type }));
  };

  return (
    <Pick className="flex" onChange={handleChange}>
      {genres.map((genre) => (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
      ))}
    </Pick>
  );
}

const Pick = styled.select`
  padding: 0.5rem;
  margin-left: 3rem;
  font-size: 1rem;
  background-color: rgba(0,0,0,0.4);
  border-radius: 4px;
  cursor: pointer;
  color: white;
`;
