import { useLocalStorage, useLocalStorageStore } from "@/components/hooks";
import { Budget, BudgetType } from "@adenpun2000/budget";
import { createSignal } from "solid-js";

export const saveData = useLocalStorageStore<BudgetType>(
    "save",
    new Budget().toJSON()
);

export const token = useLocalStorage("gh_token");

export const repo = useLocalStorage("gh_repo");
