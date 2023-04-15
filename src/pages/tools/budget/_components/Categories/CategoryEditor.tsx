import { Modal, Props as ModalProps } from "@/components/Modal";
import { Category as CategoryType, DateToMonth } from "@adenpun2000/budget";
import { Component, Show } from "solid-js";
import { getCurrentMonth, saveDataBudget } from "../states";

type Props = ModalProps & {
    category: CategoryType;
};

export const CategoryEditor: Component<Props> = (props) => {
    return (
        <Modal onClose={props.onClose} opened={props.opened}>
            <h1>{props.category.name}</h1>
            <section>
                <h2>Assign:</h2>
                <input
                    onChange={(e) =>
                        saveDataBudget.assign(
                            props.category.id,
                            getCurrentMonth(),
                            Number(e.target.value)
                        )
                    }
                    placeholder="Assigned"
                    type="number"
                    value={
                        saveDataBudget.getAssigned(
                            props.category.id,
                            getCurrentMonth(),
                            false
                        ) ?? 0
                    }
                />
                <progress
                    max={
                        saveDataBudget.getTarget(
                            props.category.id,
                            getCurrentMonth()
                        )?.amount ?? 0
                    }
                    value={
                        saveDataBudget.getAssigned(
                            props.category.id,
                            getCurrentMonth(),
                            true,
                            true
                        ) ?? 0
                    }
                ></progress>
            </section>
            <section>
                <h2>Target:</h2>
                <Show
                    fallback={
                        <>
                            <button
                                onClick={() => {
                                    saveDataBudget.setTarget(
                                        props.category.id,
                                        getCurrentMonth(),
                                        {
                                            amount: 0,
                                            day: 0,
                                            type: "weekly",
                                        }
                                    );
                                }}
                            >
                                New Target
                            </button>
                        </>
                    }
                    when={
                        saveDataBudget.getTarget(
                            props.category.id,
                            getCurrentMonth()
                        ) !== null
                    }
                >
                    <div>
                        <button
                            onClick={() => {
                                saveDataBudget.deleteTarget(
                                    props.category.id,
                                    getCurrentMonth()
                                );
                            }}
                        >
                            Delete Target
                        </button>
                    </div>
                    <select
                        onChange={(e) =>
                            saveDataBudget.setTarget(
                                props.category.id,
                                getCurrentMonth(),
                                {
                                    ...saveDataBudget.getTarget(
                                        props.category.id,
                                        getCurrentMonth()
                                    )!,
                                    // @ts-ignore
                                    type: e.target.value,
                                }
                            )
                        }
                        value={
                            saveDataBudget.getTarget(
                                props.category.id,
                                getCurrentMonth()
                            )?.type
                        }
                    >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    <Show
                        when={
                            saveDataBudget.getTarget(
                                props.category.id,
                                getCurrentMonth()
                            )?.type === "monthly" ||
                            saveDataBudget.getTarget(
                                props.category.id,
                                getCurrentMonth()
                            )?.type === "weekly"
                        }
                        fallback={
                            <input
                                type="date"
                                placeholder="Enter date..."
                                value={
                                    saveDataBudget.getTarget(
                                        props.category.id,
                                        getCurrentMonth()
                                        // @ts-ignore
                                    )?.date
                                }
                                onChange={(e) =>
                                    saveDataBudget.setTarget(
                                        props.category.id,
                                        getCurrentMonth(),
                                        {
                                            ...saveDataBudget.getTarget(
                                                props.category.id,
                                                getCurrentMonth()
                                            )!,
                                            // @ts-ignore
                                            date: DateToMonth(
                                                new Date(e.target.value)
                                            ),
                                        }
                                    )
                                }
                            />
                        }
                    >
                        <input
                            max={31}
                            min={1}
                            onChange={(e) =>
                                saveDataBudget.setTarget(
                                    props.category.id,
                                    getCurrentMonth(),
                                    {
                                        ...saveDataBudget.getTarget(
                                            props.category.id,
                                            getCurrentMonth()
                                        )!,
                                        // @ts-ignore
                                        day: parseInt(e.target.value),
                                    }
                                )
                            }
                            placeholder="Enter day of week/month..."
                            type="number"
                            value={
                                saveDataBudget.getTarget(
                                    props.category.id,
                                    getCurrentMonth()
                                    // @ts-ignore
                                )?.day
                            }
                        />
                    </Show>
                    <input
                        onChange={(e) =>
                            saveDataBudget.setTarget(
                                props.category.id,
                                getCurrentMonth(),
                                {
                                    ...saveDataBudget.getTarget(
                                        props.category.id,
                                        getCurrentMonth()
                                    )!,
                                    // @ts-ignore
                                    amount: parseInt(e.target.value),
                                }
                            )
                        }
                        placeholder="Enter amount..."
                        type="number"
                        value={
                            saveDataBudget.getTarget(
                                props.category.id,
                                getCurrentMonth()
                            )?.amount
                        }
                    />
                </Show>
            </section>
        </Modal>
    );
};
