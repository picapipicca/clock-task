import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_TIME,
  selectFormattedTime,
} from "../../../redux/slice/timeSlice";
import { fillZero } from "../../../utils/library";

import MouseTracker from "../../components/MouseTracker";

const Clock = () => {
  const [isHover, setIsHover] = useState(false);

  const dispatch = useDispatch();
  const { hours, minutes, seconds, hourAngle, minuteAngle, secondAngle } =
    useSelector(selectFormattedTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      dispatch(UPDATE_TIME());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [dispatch]);

  return (
    <>
      <CircleLO
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Hand
          $width="6px"
          $height="60px"
          $bgColor="#222"
          $top="30%"
          $left="49%"
          $transform={`${hourAngle}`}
        />
        <Hand
          $width="4px"
          $height="80px"
          $bgColor="#444"
          $top="22.5%"
          $left="49%"
          $transform={`${minuteAngle}`}
        />
        <Hand
          $width="2px"
          $height="118px"
          $bgColor="red"
          $top="10.5%"
          $left="50%"
          $transform={`${secondAngle}`}
        />
        <NumberLO $top="10px" $left="46%">
          12
        </NumberLO>
        <NumberLO $top="10%" $right="26%">
          1
        </NumberLO>
        <NumberLO $top="25%" $right="10%">
          2
        </NumberLO>
        <NumberLO $top="46%" $right="10px">
          3
        </NumberLO>
        <NumberLO $top="67%" $right="30px">
          4
        </NumberLO>
        <NumberLO $top="80%" $right="78px">
          5
        </NumberLO>
        <NumberLO $bottom="10px" $left="50%">
          6
        </NumberLO>
        <NumberLO $top="82%" $left="80px">
          7
        </NumberLO>
        <NumberLO $top="67%" $left="30px">
          8
        </NumberLO>
        <NumberLO $top="46%" $left="10px">
          9
        </NumberLO>
        <NumberLO $top="25%" $left="10%">
          10
        </NumberLO>
        <NumberLO $top="10%" $left="26%">
          11
        </NumberLO>
      </CircleLO>

      {isHover && (
        <MouseTracker
          offset={{ x: 3, y: -40 }}
          time={`${fillZero(hours)} : ${fillZero(minutes)} : ${fillZero(
            seconds
          )}`}
        />
      )}
    </>
  );
};

export default Clock;

const CircleLO = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  color: #444;
  text-align: center;

  &::after {
    background: #aaa;
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #fff;
  }
`;

const Hand = styled.div.attrs<{
  $width: string;
  $height: string;
  $bgColor: string;
  $top: string;
  $left: string;
  $transform: string;
}>((props) => ({
  style: {
    transform: `rotate(${props.$transform}deg)`,
  },
}))`
  position: absolute;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background: ${(props) => props.$bgColor};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  transform-origin: bottom;
`;

const NumberLO = styled.span<{
  $top?: string;
  $bottom?: string;
  $right?: string;
  $left?: string;
}>`
  position: absolute;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 700;
  top: ${(props) => props.$top};
  bottom: ${(props) => props.$bottom};
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};
`;
