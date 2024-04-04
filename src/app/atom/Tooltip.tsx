import React, { ReactElement } from "react";
import styled from "styled-components";

export interface ITooltipProps {
  content?: string;
  children?: ReactElement;
}

const Tooltip = ({ content, children }: ITooltipProps): ReactElement => {
  return (
    <DefaultTooltip>
      <>{children ? <>{children}</> : <p>{content}</p>}</>
    </DefaultTooltip>
  );
};

export default Tooltip;

const DefaultTooltip = styled.div`
  background-color: rgb(226 232 240);
  color: rgb(37 99 235);
  display: flex;
  text-align: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 6px;
  box-sizing: border-box;
  justify-content: center;
  filter: drop-shadow(1px 0 0 rgb(203 213 225));
`;
