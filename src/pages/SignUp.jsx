import React, { useState } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [shows, setShows] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const handleSignin = async () => {
    try {
      const { email, password } = formValue;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate("/");
    }
  });
  return (
    <Container shows={shows}>
      <Background />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, Tv shows and more</h1>
            <h4>Watch anywhere. Cancel anytime</h4>
            <h6>
              Ready to Watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Eamil Address"
              name="email"
              value={formValue.email}
              onChange={(e) =>
                setFormValue({ ...formValue, [e.target.name]: e.target.value })
              }
            />
            {shows && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValue.password}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!shows && (
              <button onClick={() => setShows(true)}>Get Started</button>
            )}
          </div>
          <button onClick={handleSignin}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      gap: 1rem;

      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }

      .form {
        display: grid;
        width: 60%;
        grid-template-columns: ${({ shows }) =>
          shows ? "1fr 1fr" : "2fr 1fr"};

        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          font-weight: bolder;
          color: white;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        border-radius: 0.2rem;
        font-weight: bolder;
        color: white;
        font-size: 1.05rem;
      }
    }
  }
`;
