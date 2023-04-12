import { Modal, Props as ModalProps } from "@/components/Modal";
import { Category as CategoryType, DateToMonth } from "@adenpun2000/budget";
import { Component, Show } from "solid-js";
import { currentMonth, saveDataBudget } from "../states";
import { Stats } from "../Stats";

type Props = ModalProps & {
    category: CategoryType;
};

export const CategoryEditor: Component<Props> = (props) => {
    const [month1] = currentMonth;
    const month = () => month1() ?? DateToMonth(Date.now());

    return (
        <Modal onClose={props.onClose} opened={props.opened}>
            <Stats />
            <h1>{props.category.name}</h1>
            <section>
                <h2>Assign:</h2>
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
                            Number(e.target.value)
                        )
                    }
                />
                <progress
                    value={
                        saveDataBudget.getAssigned(
                            props.category.id,
                            month()
                        ) ?? 0
                    }
                    max={
                        saveDataBudget.getTarget(props.category.id, month())
                            ?.amount ?? 0
                    }
                ></progress>
            </section>
            <section>
                <h2>Target:</h2>
                <Show
                    when={
                        saveDataBudget.getTarget(props.category.id, month()) !==
                        null
                    }
                    fallback={
                        <>
                            <button
                                onClick={() => {
                                    saveDataBudget.setTarget(
                                        props.category.id,
                                        month(),
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
                >
                    <div>
                        <button
                            onClick={() => {
                                saveDataBudget.deleteTarget(
                                    props.category.id,
                                    month()
                                );
                            }}
                        >
                            Delete Target
                        </button>
                    </div>
                    <select
                        value={
                            saveDataBudget.getTarget(props.category.id, month())
                                ?.type
                        }
                        onChange={(e) =>
                            saveDataBudget.setTarget(
                                props.category.id,
                                month(),
                                {
                                    ...saveDataBudget.getTarget(
                                        props.category.id,
                                        month()
                                    )!,
                                    // @ts-ignore
                                    type: e.target.value,
                                }
                            )
                        }
                    >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    <Show
                        when={
                            saveDataBudget.getTarget(props.category.id)
                                ?.type === "monthly" ||
                            saveDataBudget.getTarget(props.category.id)
                                ?.type === "weekly"
                        }
                        fallback={
                            <input
                                type="date"
                                placeholder="Enter date..."
                                value={
                                    saveDataBudget.getTarget(
                                        props.category.id,
                                        month()
                                        // @ts-ignore
                                    )?.date
                                }
                                onChange={(e) =>
                                    saveDataBudget.setTarget(
                                        props.category.id,
                                        month(),
                                        {
                                            ...saveDataBudget.getTarget(
                                                props.category.id,
                                                month()
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
                            type="number"
                            placeholder="Enter day of week/month..."
                            min={1}
                            max={31}
                            value={
                                saveDataBudget.getTarget(
                                    props.category.id,
                                    month()
                                    // @ts-ignore
                                )?.day
                            }
                            onChange={(e) =>
                                saveDataBudget.setTarget(
                                    props.category.id,
                                    month(),
                                    {
                                        ...saveDataBudget.getTarget(
                                            props.category.id,
                                            month()
                                        )!,
                                        // @ts-ignore
                                        day: parseInt(e.target.value),
                                    }
                                )
                            }
                        />
                    </Show>
                    <input
                        type="number"
                        placeholder="Enter amount..."
                        value={
                            saveDataBudget.getTarget(props.category.id, month())
                                ?.amount
                        }
                        onChange={(e) =>
                            saveDataBudget.setTarget(
                                props.category.id,
                                month(),
                                {
                                    ...saveDataBudget.getTarget(
                                        props.category.id,
                                        month()
                                    )!,
                                    // @ts-ignore
                                    amount: parseInt(e.target.value),
                                }
                            )
                        }
                    />
                </Show>
            </section>
        </Modal>
    );
};
