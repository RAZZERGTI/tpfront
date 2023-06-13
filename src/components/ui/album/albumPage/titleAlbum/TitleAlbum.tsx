import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './TitleAlbum.module.scss'
import axios from "axios";
import * as Api from "@/pages/api"
import {IAlbumInfo} from "@/interfaces/album.interface";
import Image from 'next/image'
import EditTitle from "@/components/ui/album/editTitle/EditTitle";
interface Props {
    idAlbum: string | string[] | undefined
}

const TitleAlbum:FC<Props> = ({idAlbum}) => {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);
    const getInfoAlbum = async () =>{
        let info = await Api.files.getInfoAboutAlbumById(idAlbum)
        setText(info.title)
    }
    useEffect(() => {
        getInfoAlbum()
    }, [idAlbum])

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };
    const handleChange = (e) => {
        setText(e.target.value);
        adjustTextareaHeight();
    };
    const handleEditTitle = async (idAlbum, newTitle) => {
            try {
                setIsFocused(false);
                console.log('hel', idAlbum, newTitle)
                const response = await axios.put(`http://188.212.124.120:3001/editTitle/${idAlbum}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: newTitle }),
                });
            } catch (error) {
                // Обработка ошибки
                console.error('Произошла ошибка:', error);
            }
    }
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    return (
        <div className={styles.edit}>
            <div className={styles.edit_wrapper}>
                <div className={styles.edit_textarea}>
                            <textarea
                                maxLength={125}
                                placeholder='Без названия'
                                ref={textareaRef}
                                value={text}
                                onChange={handleChange}
                                rows={1}
                                onFocus={handleFocus}
                                // onBlur={handleBlur}
                            />
                </div>
            </div>
            {isFocused && (
            <div>
                <button onClick={() => handleEditTitle(idAlbum, text)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                    <Image src={isHovered ? '/redImages/checked2.svg' : `/headerPhotoPage/checked2.svg`} width={24} height={24} alt={'checked'}/>
                </button>
            </div>
            )}
        </div>

    );
};

export default TitleAlbum;