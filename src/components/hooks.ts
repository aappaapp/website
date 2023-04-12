import { createSignal } from "solid-js";
import { createMutable } from "solid-js/store";

export function useLocalStorage<T extends string>(
    key: string,
    initialValue?: T
): [() => T | null, (value: T) => void, () => void] {
    const [value, setValue] = createSignal<T | null>(
        (localStorage.getItem(key) as T) ?? initialValue ?? null
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
            setValue(() => value);
        },
        () => {
            localStorage.removeItem(key);
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

    const a = new Proxy<T>(store, {
        get(target, p, receiver) {
            localStorage.setItem(key, JSON.stringify(store));
            // @ts-ignore
            return target[p];
        },
        set(target, p, newValue, receiver) {
            // @ts-ignore
            target[p] = newValue;
            localStorage.setItem(key, JSON.stringify(store));
            return true;
        },
    });

    return a;
}
