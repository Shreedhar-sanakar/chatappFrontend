import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_CURRENT_USER_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    } else if (name.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (handleValidation()) {
        const { email, name, password } = values;
        await axios.post(registerRoute, {
          name,
          email,
          password,
        });
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error in registration. Please try again");
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
            type="text"
            placeholder="Username"
            name="name"
            onChange={(e) => handleChange(e)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
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
  gap: 0.7rem;
  align-items: center;
  background-color: black;
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
      font-weight:bold;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    background-color: 	#25D366;
    border-radius: 2rem;
    padding: 2rem;
  }
  input {
    background-color: transparent;
    padding: 0.7rem;
    border: 0.1rem solid black;
    border-radius: 0.4rem;
    color: #000000;
    font-weight: bold;
    width: 100%;
    font-size: 0.7rem;
    &:focus {
      border: 0.1rem solid gray;
      outline: none;
    }
  }
  button {
    background-color: #000000;
    color: #25D366;
    padding: 1rem 1rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 0.7rem;
    &:hover {
      background-color: #000000;
    }
  }
  span {
    color: #000000;
    a {
      color: #000000;
      font-weight: bold;
      text-decoration: none;
    }
  }
`;

export default Register;
