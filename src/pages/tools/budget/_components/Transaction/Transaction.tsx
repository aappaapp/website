import type { Transaction as TransactionType } from "@adenpun2000/budget";
import type { Component } from "solid-js";
import { styled } from "solid-styled-components";
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
                <span style={{ "flex-grow": 1 }}>{props.description}</span>
                {props.type === "outflow" ? (
                    <span style={{ "flex-grow": 0 }}>
                        {saveDataBudget.getCategory(props.categoryId)?.name}
                    </span>
                ) : undefined}
                <span style={{ "flex-grow": 0 }}>{props.type}</span>
                <span style={{ "flex-grow": 0 }}>{props.amount}</span>
                <span
                    class="material-symbols-outlined handle"
                    onClick={() => saveDataBudget.deleteTransaction(props.id)}
                    style={{ "flex-grow": 0 }}
                >
                    delete
                </span>
            </StyledTransaction>
        </>
    );
};
