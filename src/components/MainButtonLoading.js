import React, { useState } from "react";
import styled from "styled-components";

import { VscLoading } from "react-icons/vsc";
import primaryColor from "./Variables";

const Div = styled.div`
  padding: 0px 5px;

  button {
    border-radius: 10px;
    background-color: ${primaryColor};
    color: #ffffff;
    border: 1px solid ${primaryColor};
    font-weight: bold;
    padding: 10px;
    width: 100%;
    text-align: center;
    min-height: 60px;
    transition: all 0.2s linear;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button:hover {
    background-color: #ffffff;
    color: ${primaryColor};
    transition: all 0.2s linear;
  }

  .button-status {
    animation: ${(props) =>
      props.isLoading ? "rotate 1s linear infinite" : "none"};
  }
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function MainButtonLoading(props) {
  const [loading, setLoading] = useState(false);
  return (
    <Div isLoading={props.loading}>
      <button {...props}>
        <div className="button-status">
          {props.loading === true ? (
            <h3>
              <VscLoading />
            </h3>
          ) : (
            props.text
          )}
        </div>
      </button>
    </Div>
  );
}
