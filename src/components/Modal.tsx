import { Component, Show } from "solid-js";
import { Portal } from "solid-js/web";

interface Props {
    onClose: () => void;
    opened: boolean;
    children?: any;
}

export const Modal: Component<Props> = (props) => {
    return (
        <Show when={props.opened}>
            <Portal>
                <div class="modal-bg">
                    <div class="modal-content">
                        <button onClick={props.onClose}>Close</button>
                        <div>{props.children}</div>
                    </div>
                </div>
            </Portal>
        </Show>
    );
};
