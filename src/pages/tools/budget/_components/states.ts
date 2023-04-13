import { useLocalStorage, useLocalStorageStore } from "@/components/hooks";
import { Budget, BudgetType, DateToMonth, Month } from "@adenpun2000/budget";

export const saveData = useLocalStorageStore<BudgetType>(
    "save",
    new Budget().toJSON()
);

export const saveDataBudget = Budget.fromJSON(saveData);

// @ts-ignore
globalThis.saveDataBudget = saveDataBudget;

export const currentMonth = useLocalStorage<Month>(
    "month",
    DateToMonth(Date.now())
);

export const token = useLocalStorage("gh_token");

export const repo = useLocalStorage("gh_repo");
