import React, {FC, useRef, useState} from 'react';
import {IAlbum} from "@/interfaces/album.interface";
import axios from "axios";
import Modal from "@/components/ui/modal/Modal";
import styles from "./DeleteAlbum.module.scss";
import Image from "next/image";

interface IProps {
    album: IAlbum
    active: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
}
const DeleteAlbum: FC<IProps> = ({album, active, setModal, handleDelete}) => {

    const handleDeleteAlbum = async () => {
        try {
            const response = await axios.delete(`http://188.212.124.120:3001/api/delete/album/${album.id}`)
            if (response.data.response){
                handleDelete(album.id)
                setModal(false)
            }
        } catch (error) {
            // Обработка ошибки
            console.error('Произошла ошибка:', error);
        }
    };
    return (
        <Modal active={active} setActive={setModal}>
            <div className={styles.delete_question}>
                <p>Удалить альбом?</p>
            </div>
            <div className={styles.delete_text}>
                <p>Восстановить удаленный альбом невозможно. Фото из этого альбома, также будут удалены из <span>TaP</span>.</p>
            </div>
            <div className={styles.delete_btn}>
                <button className={styles.non_delete_btn} onClick={() => setModal(false)}>Не удалять</button>
                <button className={styles.delete} onClick={handleDeleteAlbum}>Удалить</button>
            </div>
        </Modal>
    );
};

export default DeleteAlbum;