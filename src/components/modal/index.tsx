import { useState } from "react";
import { TModalProps } from "./types";
import { createPortal } from "react-dom";
import ModalOverlay from "./components/modal-overlay";

const Modal2: React.FC<TModalProps> = () => {
    const [isOpen, setOpen] = useState(false);
    const modalRoot = document.querySelector('#modals');

    return modalRoot && createPortal(
        <>
            <ModalOverlay>
                <span>11111111</span>
            </ModalOverlay>
        </>
    , modalRoot);
}

export default Modal2;