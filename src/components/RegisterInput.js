import React, { useRef, useState } from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";

//icons
import { FaTimes, FaCheck } from "react-icons/fa";
import primaryColor from "./Variables";

const Div = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 65px;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  display: flex;
  position: relative;
  align-items: center;
  padding: 0px 5px;
  transform-origin: 0;

  .input-self {
    width: 100%;
    border: none;
    margin-left: 5px;
  }

  .input-self:focus {
    height: 70%;
    border: none;
    outline: none;
  }
  .info {
    margin: 20px;
  }
`;

const InputName = styled.div`
  color: ${(props) => (props.isClicked ? primaryColor : "#888888")};
  transition: all 0.3s linear;
  position: absolute;
  z-index: 2;
  margin-left: 10px;
  transform: ${(props) =>
    props.isClicked ? "translateY(-130%)" : "translateY(0)"};

  font-size: ${(props) => (props.isClicked ? "12px" : "16px")};
`;

const Info = styled.div`
  opacity: ${(props) => (!props.show ? "1" : "0")};
  transition: all 0.5s linear;
  height: 1rem;
`;
const RegisterInput = (props) => {
  const [clicked, setClicked] = useState(false);

  const input = useRef(null);

  const focusInput = () => {
    setClicked(true);
    input.current.focus();
  };

  const blurInput = () => {
    console.log(input.current.value.length);
    if (input.current.value.length === 0) {
      setClicked(false);
    }
  };

  const getValue = (event) => {
    props.setValue(event.target.name, event.target.value);
  };

  return (
    <div>
      <Div onClick={focusInput}>
        <InputName isClicked={clicked} className="input-name">
          {props.inputName}
        </InputName>
        <input
          onChange={getValue}
          ref={input}
          {...props}
          className="input-self"
          onBlur={blurInput}
          onFocus={() => setClicked(true)}
        ></input>
        <div className="input-info-icon">
          {props.infoIcon !== undefined && clicked === true ? (
            props.infoIcon === true ? (
              <FaCheck />
            ) : (
              <FaTimes />
            )
          ) : (
            false
          )}
        </div>
      </Div>
      <Info show={props.infoIcon} className="m-2">
        {(clicked || props.showError) && props.info}
      </Info>
    </div>
  );
};

export default RegisterInput;
