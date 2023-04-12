import { useLocalStorage, useLocalStorageStore } from "@/components/hooks";
import { Budget, BudgetType, Month, DateToMonth } from "@adenpun2000/budget";
import { createSignal } from "solid-js";

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
