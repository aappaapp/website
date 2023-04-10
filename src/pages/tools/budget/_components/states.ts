import { useLocalStorage, useLocalStorageStore } from "@/components/hooks";
import { Budget, BudgetType, Month } from "@adenpun2000/budget";
import { createSignal } from "solid-js";

export const saveData = useLocalStorageStore<BudgetType>(
    "save",
    new Budget().toJSON()
);

export const saveDataBudget = Budget.fromJSON(saveData);

export const currentMonth = createSignal<Month>(
    `${new Date().getFullYear()}-${new Date().getMonth()}`
);

export const token = useLocalStorage("gh_token");

export const repo = useLocalStorage("gh_repo");
