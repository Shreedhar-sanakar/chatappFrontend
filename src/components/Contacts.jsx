import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    try {
      async function fetchData() {
        const data = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_CURRENT_USER_KEY)
        );
        setCurrentUserName(data.name);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <h3>InstaChat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: #405DE6;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 2rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.2rem;
      display: flex;
      align-items:center;
      justify-content:center;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .username {
        h3 {
          color: white;
          text-transform: capitalize;
        }
      }
    }
    .selected {
      background-color: #128c7e;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    gap: 2rem;
    .username {
      h2 {
        color: #C13584;
        text-transform: capitalize;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
