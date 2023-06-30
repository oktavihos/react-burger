import { TModalProps } from "./types";
import { createPortal } from "react-dom";
import ModalOverlay from "./components/modal-overlay";
import modalStyle from './style.module.sass';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect } from "react";

const Modal: React.FC<TModalProps> = ({title = '', children, closeModalHandle = () => {}, extraClass}) => {
    const modalRoot = document.querySelector('#modals');

    const handleEscapePress = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModalHandle();
        }
    }, [closeModalHandle]);

    useEffect(() => {
        document.addEventListener('keydown', handleEscapePress);
        return () => document.removeEventListener('keydown', handleEscapePress);
    }, [handleEscapePress])

    return <>
        {modalRoot && createPortal(
            <ModalOverlay closeModalHandle={closeModalHandle}>
                <div className={`${modalStyle.modal} pt-10 pr-10 pl-10 pb-15`}>
                    <div className={`${modalStyle.modalHeader}`}>
                        <span className="text text_type_main-large">{title}</span>
                        <span className={modalStyle.close}><CloseIcon onClick={() => closeModalHandle()} type="primary" /></span>
                    </div>
                    <div className={`${extraClass ? ` ${extraClass}` : ''}`}>{children}</div>
                </div>
            </ModalOverlay>
        , modalRoot)}
    </>
}

export default Modal;