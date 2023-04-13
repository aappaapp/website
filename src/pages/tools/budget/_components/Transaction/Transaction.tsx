import type { Transaction as TransactionType } from "@adenpun2000/budget";
import type { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { FlexSpan } from "../FlexSpan";
import { saveDataBudget } from "../states";

type Props = TransactionType;

const StyledTransaction = styled.div`
    background-color: #222222;
    display: flex;
    gap: 10px;
    padding: 10px;

    cursor: pointer;

    &:hover {
        background-color: #111111;
    }
`;

export const Transaction: Component<Props> = (props) => {
    return (
        <>
            <StyledTransaction>
                <FlexSpan flexGrow={1}>{props.description}</FlexSpan>
                {props.type === "outflow" ? (
                    <FlexSpan flexGrow={0}>
                        {saveDataBudget.getCategory(props.categoryId)?.name}
                    </FlexSpan>
                ) : undefined}
                <FlexSpan flexGrow={0}>{props.type}</FlexSpan>
                <FlexSpan flexGrow={0}>{props.amount}</FlexSpan>
                <FlexSpan
                    class="material-symbols-outlined handle"
                    onClick={() => saveDataBudget.deleteTransaction(props.id)}
                >
                    delete
                </FlexSpan>
            </StyledTransaction>
        </>
    );
};
