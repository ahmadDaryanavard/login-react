import React, { useReducer, useRef, useState, useEffect } from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import RegisterInput from "./RegisterInput";
import { getValue } from "@testing-library/user-event/dist/utils";
import MainButtonLoading from "./MainButtonLoading";
import checkRegister from "../functions/checkRegister";

const Div = styled.div`
  width: 70%;
  .sign-up {
    padding-top: 20px;

    height: 750px;
    background-color: #fcfcfc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sign-up-inputs {
    width: 85%;
    margin-top: 40px;
  }
  .sign-up-inputs > * {
    margin-top: 25px;
  }

  .sign-up-button-place {
    width: 85%;
    margin-top: 40px;
  }

  .login-section {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
  }
  .login-button {
    font-weight: bold;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 96%;
  }
`;

//reducer for info that we getting from client
const initialState = { email: "", password: "", confirmPassword: "" };
const reducer = (state, action) => {
  return { ...state, [action.name]: action.value };
};

function SignUp(props) {
  //for loading icon on button when sign up clicked we show loading icon fo 5sec
  const [loading, setLoading] = useState(false);
  const loadingOnButton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.changeForm();
      props.successToast("Your account has been created successfully!");
    }, 5000);
  };
  const [signUP, signUPDispatch] = useReducer(reducer, initialState);

  const [signUpCheck, setSignUpChecker] = useState({});
  useEffect(() => {
    setSignUpChecker(checkRegister(signUP, "signup"));
  }, [signUP]);

  const [error, setError] = useState(false);

  const getValue = (name, value) => {
    signUPDispatch({ name: name, value: value });
  };

  //create new user account
  const createUser = () => {
    if (Object.values(signUpCheck).includes(false)) {
      setError(true);
    } else {
      setError(false);

      props.createUser({
        action: "add",
        email: signUP.email,
        password: signUP.password,
      });
      loadingOnButton();
    }
  };
  return (
    <Div>
      <div className="sign-up">
        <h4 className="text-bold">Sign Up</h4>
        <span className="text-center w-50">
          Please create your Account first
        </span>
        <div className="p-2 sign-up-inputs">
          <RegisterInput
            setValue={getValue}
            inputName={"Email"}
            name="email"
            info={signUpCheck.email}
            infoIcon={signUpCheck.emailStat}
            showError={error}
          />

          <RegisterInput
            setValue={getValue}
            inputName={"Password"}
            name="password"
            type="password"
            info={signUpCheck.password}
            infoIcon={signUpCheck.passwordStat}
            showError={error}
          />

          <RegisterInput
            setValue={getValue}
            inputName={"Confirm Password"}
            name="confirmPassword"
            type="password"
            info={signUpCheck.confirmPassword}
            infoIcon={signUpCheck.confirmPasswordStat}
            showError={error}
          />
        </div>

        <div className="sign-up-button-place">
          <MainButtonLoading
            loading={loading}
            text={"SIGN UP"}
            onClick={createUser}
          />
        </div>

        <div className="login-section">
          <div className="login-text mx-1">Already have an account?</div>
          <div onClick={() => props.changeForm()} className="login-button">
            Login
          </div>
        </div>
      </div>
    </Div>
  );
}

export default SignUp;
