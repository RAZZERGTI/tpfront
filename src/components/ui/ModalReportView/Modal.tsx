import React, {FC, ReactNode} from 'react';
import styles from './Modal.module.scss'

interface IProps{
    active: boolean,
    setActive?:  React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactNode
}

const Modal:FC<IProps> = ({active, setActive, children}) => {
    return (
        <div className={active ? styles.modal_active : styles.modal} onClick={() => setActive && setActive(false) }>
            <div className={active ? styles.modal__content_active : styles.modal__content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;