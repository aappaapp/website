import { useLocalStorage } from "@/components/hooks";
import type { Component } from "solid-js";
import { counter } from "./states";

export const Counter: Component = () => {
    const [count, setCount] = counter;

    return (
        <>
            <button
                onClick={() => {
                    // setCount((count() ?? 0) + 1);
                }}
            >
                {/* Counter: {count()} */}
            </button>
        </>
    );
};
