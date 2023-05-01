import type { Category as CategoryType, z } from "@adenpun2000/budget";
import type { Component } from "solid-js";
import { ProgressBar } from "../../ProgressBar";
import { getCurrentMonth, saveDataBudget } from "../../states";

interface Props {
    category: z.infer<typeof CategoryType>;
}

export const AssignSection: Component<Props> = (props) => {
    return (
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
            <ProgressBar
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
            />
        </section>
    );
};
