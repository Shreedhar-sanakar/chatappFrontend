import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Welcome = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    try {
      async function fetchData() {
        setUserName(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_CURRENT_USER_KEY)
          ).name
        );
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Container>
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Select a person to start chatting.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  span {
    color: #C13584;
    text-transform: capitalize;
  }
`;

export default Welcome;
