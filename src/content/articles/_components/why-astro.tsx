import { Component, createSignal } from "solid-js";

const WhyAstro: Component = () => {
    const [count, setCount] = createSignal(0);

    return (
        <button
            onClick={() => {
                setCount((p) => p + 1);
            }}
        >
            Counter: {count()}
        </button>
    );
};

export default WhyAstro;
