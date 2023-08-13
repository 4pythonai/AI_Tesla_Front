import React from "react";
// import TimerStyled from "./TimerStyled";
import styled from "styled-components";
import Digit from "./Digit";

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 28px;
`;

const SepartorContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 0 10px 0px;
`;

const Separtor = styled.span`
  display: inline-block;
  width: 3px;
  height: 3px;
  background-color: #404549;
  border-radius: 6px;
  margin: 5px 0px 5px 0px;
`;

export default function RenderClock(props) {
  let seconds = props.seconds;
  let minutes = props.minutes;

  return (
    <div
      style={{
        height: "52px",
      }}
    >
      <TimerContainer>
        <Digit value={minutes} title="Minutes" addSeparator />
        <SepartorContainer>
          <Separtor />
          <Separtor />
        </SepartorContainer>
        <Digit value={seconds} title="Seconds" />
      </TimerContainer>
    </div>
  );
}
