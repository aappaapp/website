import { Modal, Props as ModalProps } from "@/components/Modal";
import type { Category as CategoryType, z } from "@adenpun2000/budget";
import type { Component } from "solid-js";
import { AssignSection } from "./AssignSection";
import { TargetSection } from "./TargetSection";

type Props = ModalProps & {
    category: z.infer<typeof CategoryType>;
};

export const CategoryEditor: Component<Props> = (props) => {
    return (
        <Modal onClose={props.onClose} opened={props.opened}>
            <h1>{props.category.name}</h1>
            <AssignSection category={props.category} />
            <TargetSection category={props.category} />
        </Modal>
    );
};
