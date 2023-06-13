import React, {FC, useRef, useState} from 'react';
import styles from "./EditTitle.module.scss";
import Image from "next/image";
import Modal from "@/components/ui/modal/Modal";
import axios from "axios";
import {IAlbum} from "@/interfaces/album.interface";
interface IProps {
    album: IAlbum
    active: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
}
const EditTitle: FC<IProps> = ({album, active, setModal, onTitleChange }) => {
    const [text, setText] = useState(album.title);
    const textareaRef = useRef(null);
    const handleSave = () => {
        onTitleChange(text);
        setModal(false);
    };
    const handleUpdateAlbum = async (albumId, newTitle) => {
        try {
            const response = await axios.put(`http://188.212.124.120:3001/editTitle/${albumId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle }),
            });
            if (response.data.message){
                handleSave();
                setModal(false)
                // window.location.reload();
            }
        } catch (error) {
            // Обработка ошибки
            console.error('Произошла ошибка:', error);
        }
    };
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const cancelBtnHandler = () => {
        setText(album.title)
        setModal(false)
    }
    const handleChange = (e) => {
        setText(e.target.value);
        adjustTextareaHeight();
    };
    return (
            <Modal active={active} setActive={setModal}>
                <div className={styles.edit_wrapper}>
                    <div className={styles.edit_image}>
                        <Image src={`http://188.212.124.120:3001/api/download/${album.idLogo}`}
                               alt={album.title}
                               fill={true}/>
                    </div>
                    <div className={styles.edit_text}>
                        <div className={styles.edit_label}>
                            <label htmlFor="" >
                                Переименовать альбом
                            </label>
                        </div>
                        <div className={styles.edit_textarea}>
                            <textarea
                                maxLength={125}
                                placeholder='Без названия'
                                ref={textareaRef}
                                value={text}
                                onChange={handleChange}
                                rows={1}/>
                        </div>
                    </div>
                </div>
                <div className={styles.btn}>
                    <button className={styles.btn_cancel} onClick={cancelBtnHandler}>
                        Отмена
                    </button>
                    <button className={styles.btn_done} onClick={() => handleUpdateAlbum(album.id, text)}>
                        Готово
                    </button>
                </div>
            </Modal>
    );
};

export default EditTitle;