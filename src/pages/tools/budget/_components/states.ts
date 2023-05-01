import { useLocalStorage, useLocalStorageStore } from "@/components/hooks";
import { Budget, BudgetType, DateToMonth, Month, z } from "@adenpun2000/budget";
// @ts-ignore
globalThis.Budget = Budget;

export const saveData = useLocalStorageStore<z.infer<typeof BudgetType>>(
    "save",
    new Budget().toJSON()
);

export const saveDataBudget = Budget.FromJSON(saveData);
// @ts-ignore
globalThis.saveDataBudget = saveDataBudget;

if ({ ...(saveDataBudget as any).m_budget }.version !== 2)
    localStorage.setItem(
        "save",
        JSON.stringify(Budget.Update({ ...(saveDataBudget as any).m_budget }))
    );

export const currentMonth = useLocalStorage<z.infer<typeof Month>>(
    "month",
    DateToMonth(Date.now())
);

export const getCurrentMonth = (): z.infer<typeof Month> => {
    return currentMonth[0]() ?? DateToMonth(Date.now());
};

export const token = useLocalStorage("gh_token");

export const repo = useLocalStorage("gh_repo");
