import React, { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

import "bootstrap/dist/css/bootstrap.min.css";
import RegisterInput from "./RegisterInput";
import { getValue } from "@testing-library/user-event/dist/utils";
import MainButtonLoading from "./MainButtonLoading";
import checkRegister from "../functions/checkRegister";
import primaryColor from "./Variables";

const Div = styled.div`
  width: 70%;
  .login {
    padding-top: 20px;

    height: 750px;
    background-color: #fcfcfc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-inputs {
    width: 85%;
    margin-top: 50px;
  }
  .login-inputs > * {
    margin-top: 25px;
  }

  .login-button-place {
    width: 85%;
    margin-top: 40px;
  }

  .sign-up-section {
    display: flex;
    flex-direction: row;
    margin-top: 50px;
  }
  .sign-up-button {
    font-weight: bold;
    cursor: pointer;
  }
  .logo {
    width: 150px;
    height: 150px;
    color: ${primaryColor};
  }

  @media (max-width: 768px) {
    width: 96%;
  }
`;

//reducer for info that we getting from client
const initialState = { email: "", password: "" };
const reducer = (state, action) => {
  return { ...state, [action.name]: action.value };
};

function Login(props) {
  const [loading, setLoading] = useState(false);

  const [login, loginDispatch] = useReducer(reducer, initialState);
  const [loginCheck, setLoginChecker] = useState({});
  useEffect(() => {
    setLoginChecker(checkRegister(login, "login"));
  }, [login]);

  const [email, setEmail] = useState("");

  const getValue = (name, value) => {
    loginDispatch({ name: name, value: value });
  };

  //console.log(login);
  console.log(loginCheck);

  //login user in account
  const loginUser = () => {
    if (props.checkUserLogin(login.email, login.password)) {
      setLoading(true);
      setTimeout(() => {
        props.successToast("You logged into your account successfully!");
        setLoading(false);
      }, 3000);
    } else {
      setLoading(true);
      setTimeout(() => {
        props.errorToast("There is no user with this Email and Password!");
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <Div>
      <div className="login">
        <h4 className="text-bold">
          <Icon className="logo" icon="bxs:shopping-bag-alt" />
        </h4>
        <h4 className="text-center w-50">Login</h4>
        <div className="p-2 login-inputs">
          <RegisterInput
            setValue={getValue}
            inputName={"Email"}
            name="email"
            info={loginCheck.email}
            infoIcon={loginCheck.emailStat}
          />

          <RegisterInput
            setValue={getValue}
            inputName={"Password"}
            name="password"
            type="password"
            info={loginCheck.password}
            infoIcon={loginCheck.passwordStat}
          />
        </div>

        <div className="login-button-place">
          <MainButtonLoading
            loading={loading}
            onClick={loginUser}
            text={"LOGIN"}
          />
        </div>

        <div className="sign-up-section">
          <div className="sign-up-text mx-1">Don't have an account?</div>
          <div onClick={() => props.changeForm()} className="sign-up-button">
            SignUp
          </div>
        </div>
      </div>
    </Div>
  );
}

export default Login;
