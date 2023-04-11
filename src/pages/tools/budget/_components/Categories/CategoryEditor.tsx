import { Modal, Props as ModalProps } from "@/components/Modal";
import type { Category as CategoryType } from "@adenpun2000/budget";
import type { Component } from "solid-js";
import { currentMonth, saveDataBudget } from "../states";

type Props = ModalProps & {
    category: CategoryType;
};

export const CategoryEditor: Component<Props> = (props) => {
    const [month] = currentMonth;
    return (
        <Modal onClose={props.onClose} opened={props.opened}>
            <h1>{props.category.name}</h1>
            <section>
                <input
                    type="number"
                    placeholder="Assigned"
                    value={
                        saveDataBudget.getAssigned(
                            props.category.id,
                            month()
                        ) ?? 0
                    }
                    onChange={(e) =>
                        saveDataBudget.assign(
                            props.category.id,
                            month(),
                            Number((e.target as HTMLInputElement).value)
                        )
                    }
                />
                <progress
                    value={(
                        saveDataBudget.getAssigned(
                            props.category.id,
                            month()
                        ) ??
                        0 /
                            (saveDataBudget.getTarget(
                                props.category.id,
                                month()
                            )?.amount ?? 1)
                    )?.toString()}
                ></progress>
            </section>
            <section>Target:</section>
        </Modal>
    );
};
