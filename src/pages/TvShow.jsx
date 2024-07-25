import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailble from "./NotAvailble";
import Select from "../components/Select";

export default function TvShow() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
    }
  }, [genresLoaded, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <Select genres={genres} type="tv" />
        {movies.length ? (
          <Slider movies={movies} type="movie" />
        ) : (
          <NotAvailble />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-availble {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
