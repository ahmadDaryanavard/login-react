import React, { useReducer, useRef, useState } from "react";
import styled from "styled-components";

//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const Div = styled.div`
  padding: 10vh 0;
  margin: 0;
  .section {
    height: 750px;
    overflow: hidden;
  }
  .forms {
    width: 200%;
    display: flex !important;
    transition: all 0.5s ease-in;
    transform: ${(props) =>
      props.isLogin ? "translateX(0)" : "translateX(-50%)"};
  }

  .col-lg-4 {
    padding: 0px !important;
    margin: 0px !important;
  }

  .login-form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sign-up-form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

//for creating user with use reducer

const initialState = [];
const reducer = (state, action) => {
  switch (action.action) {
    case "add":
      return [...state, { email: action.email, password: action.password }];
    default:
      return state;
  }
};

function App() {
  //for toast success message
  const successToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //for toast error message
  const errorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //for creating new users and checking user information
  const [users, dispatchUser] = useReducer(reducer, initialState);

  const checkUserLogin = (email, password) => {
    let checkValue = false;
    users.map((user) => {
      if (user.email === email) {
        if (user.password === password) {
          checkValue = true;
        }
      }
    });
    return checkValue;
  };
  console.log(users);
  //end of user management

  const [login, setLogin] = useState(true);
  const changeForm = () => {
    setLogin(!login);
  };
  return (
    <Div isLogin={login} className="container-fluid row">
      <div className="col-lg-4"></div>
      <div className="col-lg-4 section">
        <div className="forms">
          <div className="login-form">
            <Login
              checkUserLogin={checkUserLogin}
              successToast={successToast}
              errorToast={errorToast}
              changeForm={changeForm}
            />
          </div>
          <div className="sign-up-form">
            <SignUp
              successToast={successToast}
              createUser={dispatchUser}
              changeForm={changeForm}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-4"></div>
      <ToastContainer />
    </Div>
  );
}

export default App;
