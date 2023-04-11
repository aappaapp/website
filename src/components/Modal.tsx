import { Component, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { styled } from "solid-styled-components";

export interface Props {
    onClose: () => void;
    opened: boolean;
    children?: any;
}

const StyledModalBg = styled.div`
    background-color: #000000aa;
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 999;
`;

const StyledModalContent = styled.div`
    background-color: #111111;
    height: 85vh;
    left: 50%;
    padding: 10px;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 85vw;
`;

export const Modal: Component<Props> = (props) => {
    let ref: HTMLDivElement | undefined;
    return (
        <Show when={props.opened}>
            <Portal>
                <StyledModalBg
                    ref={ref}
                    onClick={(e) => {
                        if (e.target === ref) props.onClose();
                    }}
                >
                    <StyledModalContent>
                        <button onClick={() => props.onClose()}>Close</button>
                        <div>{props.children}</div>
                    </StyledModalContent>
                </StyledModalBg>
            </Portal>
        </Show>
    );
};
