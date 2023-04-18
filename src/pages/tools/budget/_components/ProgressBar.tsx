import type { Component } from "solid-js";

interface Props {
    max: number | undefined;
    value: number | undefined;
    ref?: HTMLProgressElement;
}

export const ProgressBar: Component<Props> = (props) => {
    return (
        <progress
            max={props.max ?? 1}
            ref={props.ref}
            value={props.value ?? 0}
        />
    );
};
