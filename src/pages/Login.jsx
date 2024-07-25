import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      const { email, password } = formValue;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <Container>
      <Background />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Eamil Address"
                name="email"
                value={formValue.email}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />
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
              <button onClick={handleLogin}>Log In</button>
            </div>
          </div>
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
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 23vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
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
    }
  }
`;
