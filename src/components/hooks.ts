import { createSignal } from "solid-js";
import { createMutable } from "solid-js/store";

export function useLocalStorage(
    key: string,
    initialValue?: string
): [() => string | null, (value: string) => void, () => void] {
    const [value, setValue] = createSignal<string | null>(
        localStorage.getItem(key) ?? initialValue ?? null
    );

    if (
        localStorage.getItem(key) === null &&
        typeof initialValue !== "undefined"
    )
        localStorage.setItem(key, initialValue);

    return [
        () => {
            return value();
        },
        (value) => {
            localStorage.setItem(key, value);
            setValue(value);
        },
        () => {
            setValue(null);
        },
    ];
}

export function useLocalStorageStore<T extends object>(
    key: string,
    initialValue: T
): T {
    const store = createMutable<T>(
        localStorage.getItem(key) === null
            ? initialValue
            : JSON.parse(localStorage.getItem(key)!)
    );

    if (localStorage.getItem(key) === null)
        localStorage.setItem(key, JSON.stringify(initialValue));

    const a = new Proxy(store, {
        get(target, p, receiver) {
            localStorage.setItem(key, JSON.stringify(store));
            // @ts-ignore
            return target[p];
        },
    });

    return a;
}
