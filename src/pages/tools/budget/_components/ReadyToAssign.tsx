import type { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { currentMonth, saveDataBudget } from "./states";
import { formatMoney } from "./utils";

interface Props {}

const StyledDiv = styled.div<{ available: number }>`
    background-color: ${(props) =>
        props.available >= 0 ? "#00aa00" : "#ff0000"};
    display: inline-block;
    padding: 10px;
`;

export const ReadyToAssign: Component<Props> = (props) => {
    const [getCurrentMonth] = currentMonth;

    const available = () =>
        saveDataBudget.getAvailable(getCurrentMonth() ?? undefined);

    return (
        <StyledDiv available={available()}>{`Ready to assign: ${formatMoney(
            available()
        )}`}</StyledDiv>
    );
};
