import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import Modal from "@/components/ui/ModalReportView/Modal";
import styles from './ModalReport.module.scss'
import Image from "next/image";
import * as Api from "@/pages/api";
import {sendReport} from "@/pages/api/files";

interface IProps {
    idPhoto: string
    idAlbum: string
    idUser: string
    active: boolean
    setModal: Dispatch<SetStateAction<boolean>>
}

const ModalReport:FC<IProps> = ({idPhoto,idAlbum,idUser,active, setModal}) => {
    const [selectedButtons, setSelectedButtons] = useState([]);

    const handleButtonClick = (index) => {
        if (selectedButtons.includes(index)) {
            setSelectedButtons(selectedButtons.filter((btnIndex) => btnIndex !== index));
        } else {
            setSelectedButtons([...selectedButtons, index]);
        }
    };

    const handleSubmit = async () => {
        if (idPhoto && idAlbum){
            const sendReport = await Api.files.sendReport(idPhoto, idAlbum, idUser, selectedButtons)
            if (sendReport.data){
                setModal(false)
            }
        }
    };
    console.log(selectedButtons)
    return (
        <Modal active={active} setActive={setModal}>
            <button className={styles.close} onClick={() => setModal(false)}>
                <Image src="/close.svg" alt="close" width={24} height={24}/>
            </button>
            <div className={styles.write_comment}>
                <h3>Что именно вам кажется недопустимым в этом материале?</h3>
            </div>
            <div className={styles.btn}>
                <button className={selectedButtons.includes(0) ? styles.active_button : styles.default_button}
                        style={{ borderTop: '1px solid rgba(66, 66, 66, 0.57)' }}
                        onClick={() => handleButtonClick(0)}>
                    <b>Спам</b>
                </button>
                <button className={selectedButtons.includes(1) ? styles.active_button : styles.default_button}
                        onClick={() => handleButtonClick(1)}>
                    <b>Запрещенный товар</b>
                </button>
                <button className={selectedButtons.includes(2) ? styles.active_button : styles.default_button}
                        onClick={() => handleButtonClick(2)}>
                    <b>Обман</b>
                </button>
                <button className={selectedButtons.includes(3) ? styles.active_button : styles.default_button}
                        onClick={() => handleButtonClick(3)}>
                    <b>Насилие и вражда</b>
                </button>
                <button className={selectedButtons.includes(4) ? styles.active_button : styles.default_button}
                        onClick={() => handleButtonClick(4)}>
                    <b>Откровенное изображение</b>
                </button>
            </div>
            <div className={styles.send_report}>
                <button className={styles.non_send} onClick={() => setModal(false)}>Отмена</button>
                <button className={styles.send} onClick={handleSubmit}>Отправить жалобу</button>
            </div>
        </Modal>
    );
};

export default ModalReport;