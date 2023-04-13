import type { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { currentMonth, getCurrentMonth, saveDataBudget } from "./states";
import { formatMoney } from "./utils";

interface Props {}

const StyledDiv = styled.div<{ available: number }>`
    background-color: ${(props) =>
        props.available >= 0 ? "#00aa00" : "#ff0000"};
    display: inline-block;
    padding: 10px;
`;

export const ReadyToAssign: Component<Props> = (props) => {
    const limit = () => saveDataBudget.getAssignLimit(getCurrentMonth());

    return (
        <StyledDiv available={limit()}>{`Ready to assign: ${formatMoney(
            limit()
        )}`}</StyledDiv>
    );
};
