import React, {Dispatch, FC, SetStateAction} from 'react';
import Modal from "@/components/ui/modal/Modal";
import styles from './ModalHelp.module.scss'
import Image from "next/image";
import {CloudOutlined} from "@ant-design/icons";

interface IProps {
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
}
const ModalHelp:FC<IProps> = ({active, setActive}) => {
    return (
        <Modal active={active} setActive={setActive}>
            <button className={styles.close} onClick={() => setActive(false)}>
                <Image src="/close.svg" alt="close" width={24} height={24}/>
            </button>
            <div className={styles.wrapper}>
                <div className={styles.modal}>
                    Данный дипломный проект разработал учащийся 44ТП группы:
                    <p>Русин Глеб Владимирович</p>
                </div>
                <div className={styles.logo_wrapper}>
                    <Image src={'/tg_qrcode.jpg'} alt={'Telegram qr'} height={110} width={90}/>
                    <h2 className={styles.logo}>
                        <CloudOutlined />
                        TaP
                    </h2>
                </div>
            </div>
        </Modal>
    );
};

export default ModalHelp;