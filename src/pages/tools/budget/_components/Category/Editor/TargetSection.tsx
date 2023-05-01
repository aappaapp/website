import type { Category as CategoryType, z } from "@adenpun2000/budget";
import { Component, Match, Show, Switch } from "solid-js";
import { getCurrentMonth, saveDataBudget } from "../../states";

interface Props {
    category: z.infer<typeof CategoryType>;
}

export const TargetSection: Component<Props> = (props) => {
    const getTarget = () =>
        saveDataBudget.getTarget(props.category.id, getCurrentMonth())!;

    return (
        <section>
            <h2>Target:</h2>
            <Show
                fallback={
                    <button
                        onClick={() => {
                            saveDataBudget.setTarget(
                                props.category.id,
                                getCurrentMonth(),
                                {
                                    amount: 0,
                                    dayOfWeek: 1,
                                    every: 1,
                                    type: "every_x_week",
                                }
                            );
                        }}
                    >
                        New Target
                    </button>
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
                <Switch>
                    <Match
                        when={
                            getTarget().type === "every_x_month" &&
                            getTarget().type === "every_x_year"
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
                                        ...getTarget()!,
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
                    </Match>
                    <Match when={getTarget().type === "every_x_year"}>
                        <input
                            onChange={(e) =>
                                saveDataBudget.setTarget(
                                    props.category.id,
                                    getCurrentMonth(),
                                    {
                                        ...getTarget()!,
                                        // @ts-ignore
                                        date: `${
                                            new Date(
                                                e.target.value
                                            ).getMonth() + 1
                                        }-${new Date(
                                            e.target.value
                                        ).getDate()}`,
                                    }
                                )
                            }
                            placeholder="Enter date..."
                            type="date"
                            // @ts-ignore
                            value={getTarget()?.date}
                        />
                    </Match>
                </Switch>
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
    );
};
