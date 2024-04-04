import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import Tooltip from "../atom/Tooltip";

interface IMouseTrackerProps {
  time?: string;
  offset?: {
    x: number;
    y: number;
  };
}

const MouseTracker = ({
  time,
  offset = { x: 0, y: 0 },
}: IMouseTrackerProps) => {
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (element.current) {
        const x = e.clientX + offset.x;
        const y = e.clientY + offset.y;
        element.current.style.transform = `translate(${x}px, ${y}px)`;
        element.current.style.visibility = "visible";
      }
    }
    document.addEventListener("mousemove", handler);

    return () => document.removeEventListener("mousemove", handler);
  }, [offset.x, offset.y]);

  return createPortal(
    <Tracker ref={element}>
      <Tooltip content={time} />
    </Tracker>,
    document.body
  );
};

export default MouseTracker;

const Tracker = styled.div`
  position: fixed;
  pointer-events: none;
  visibility: hidden;
`;
