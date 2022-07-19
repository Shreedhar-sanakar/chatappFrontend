import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email and Password is required.");
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          email,
          password,
        });
        console.log(data);
        localStorage.setItem(
          process.env.REACT_APP_CURRENT_USER_KEY,
          JSON.stringify(data)
        );
        toast.success("Login successful");
        navigate("/");
      } catch (error) {
        toast.error("Error in login. Please try again");
      }
    }
  };
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>InstaChat</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #000000;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    background-color: #25D366;
    border-radius: 2rem;
    padding: 2rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid black;
    border-radius: 0.4rem;
    color: black;
    font-weight:bold;
    width: 100%;
    font-size: 0.7rem;
    &:focus {
      border: 0.1rem solid gray;
      outline: none;
    }
  }
  button {
    background-color: black;
    color: #25D366;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    &:hover {
      background-color: black;
    }
  }
  span {
    color: black;
    a {
      font-weight: bold;
      color: black;
      text-decoration: none;
    }
  }
`;

export default Login;
