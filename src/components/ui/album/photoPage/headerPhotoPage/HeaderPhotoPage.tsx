import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import styles from "./HeaderPhotoPage.module.scss";
import Link from "next/link";
import Image from "next/image";
import {Tooltip} from "react-tippy";
import * as Api from "@/pages/api"
import {deletePhoto} from "@/pages/api/files";
interface IProps {
    imageUrl: string
    idUser: string
    inputText: string
    ids: string | string[] | undefined
    showText: boolean
    setShowText: Dispatch<SetStateAction<boolean>>
    savePhoto: void
    editMenu: boolean
    setEditMenu: Dispatch<SetStateAction<boolean>>
    setShape: Dispatch<SetStateAction<any[]>>
    selectedColor: string
    setSelectedColor: Dispatch<SetStateAction<string>>
    frameBorder: boolean
    setFrameBorder: Dispatch<SetStateAction<boolean>>
    activeReport: boolean
    setActiveReport: Dispatch<SetStateAction<boolean>>
}
const HeaderPhotoPage:FC<IProps> = ({imageUrl,activeReport, setActiveReport, selectedColor,frameBorder, setFrameBorder, setSelectedColor,setShape,idUser,editMenu, setEditMenu, savePhoto, inputText, ids, showText, setShowText }) => {
    const deletePhotoHandler = async () => {
        if (ids !== undefined){
            await deletePhoto(ids[0], ids[2])
            location.href = `/dashboard/album/${ids[0]}`
        }
    }
    const handleEditMenu = () => {
        setEditMenu(!editMenu)
    }
    const handleActiveReport = () => {
        setActiveReport(!activeReport)
    }
    const colorPickerRef = useRef(null);

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const handleEditColor = () => {
        colorPickerRef.current.click();
    };
    const handleFrameBorder = () => {
        setFrameBorder(!frameBorder)
    }

    return (
        <div className={styles.header_bar} style={editMenu ? { right: 360 }:{ }}>
            <div className={styles.previous_btn}>
                <Link href={`/dashboard/album/${ids !== undefined ? ids[0] : ''}`}>
                    <Image src={`/headerPhotoPage/previous.svg`}
                           alt={'previous'}
                           width={24}
                           height={24}
                    />
                </Link>
            </div>
            { !editMenu ?
                <div className={styles.btn}>
                    <button className={styles.save_infos} onClick={savePhoto}>
                        Сохранить в альбом
                    </button>
                        <button className={styles.previous_btn} onClick={handleFrameBorder}>
                            <Image src={`/headerPhotoPage/frame_add.svg`}
                                   alt={'previous'}
                                   width={24}
                                   height={24}
                            />
                        </button>
                        <button className={styles.previous_btn} onClick={handleEditColor}>
                            <input
                                type="color"
                                value={selectedColor}
                                onChange={handleColorChange}
                                ref={colorPickerRef}
                                style={{ display: 'none' }}
                            />
                            <Image
                                src={`/headerPhotoPage/picker.png`}
                                alt={'previous'}
                                width={24}
                                height={24}
                            />
                        </button>
                        <button className={styles.previous_btn} onClick={handleEditMenu}>
                            <Image src={`/headerPhotoPage/shape_add.svg`}
                                   alt={'previous'}
                                   width={24}
                                   height={24}
                            />
                        </button>
                        <button className={styles.previous_btn} onClick={() => setShowText(!showText)}>
                            <Image src={`/headerPhotoPage/watermark.svg`}
                                   alt={'previous'}
                                   width={24}
                                   height={24}
                            />
                        </button>
                        <button className={styles.previous_btn}>
                            <a href={imageUrl} target='_blank'>
                                <Image src={`/headerPhotoPage/download.svg`}
                                       alt={'download'}
                                       width={24}
                                       height={24}
                                />
                            </a>
                        </button>
                        <button className={styles.previous_btn} onClick={handleActiveReport}>
                            <Image src={`/headerPhotoPage/support.svg`}
                                   alt={'report'}
                                   width={24}
                                   height={24}
                            />
                        </button>
                        <button className={styles.previous_btn} onClick={deletePhotoHandler}>
                            <Image src={`/headerPhotoPage/delete.svg`}
                                   alt={'delete'}
                                   width={24}
                                   height={24}
                            />
                        </button>
                </div>
                :
                <div className={styles.btn_edit}>
                    <button className={styles.save_infos} onClick={() => setShape([])}>
                        Отменить изменения
                    </button>
                    <button className={styles.save_infos} onClick={handleEditMenu}>
                        Готово
                    </button>
                </div>
            }

        </div>
    );
};

export default HeaderPhotoPage;