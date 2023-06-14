import React, {FC, useEffect, useState} from 'react';
import { IAlbumDataSingle} from "@/interfaces/album.interface";
import Image from "next/image";
import styles from './AlbumItem.module.scss'
import Link from "next/link";
import {Dropdown, MenuProps, Space} from "antd";
import {Tooltip} from "react-tippy";
import 'react-tippy/dist/tippy.css';
import EditTitle from "@/components/ui/album/editTitle/EditTitle";
import DeleteAlbum from "@/components/ui/album/deleteAlbum/DeleteAlbum";

const AlbumItem: FC<IAlbumDataSingle> = ({album, handleDeleteAlbum}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editTitleModal, setEditTitleModal] = useState(false)
    const [deleteAlbumModal, setDeleteAlbumModal] = useState(false)
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a rel="noopener noreferrer" onClick={() =>setEditTitleModal(true)}>
                    Переименовать альбом
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a rel="noopener noreferrer" onClick={() => setDeleteAlbumModal(true)}>
                    Удалить альбом
                </a>
            ),
        },
        // {
        //     key: '3',
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        //             Удалить альбом
        //         </a>
        //     ),
        // },
    ];
    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [title, setTitle] = useState(album.title);
    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    return (
        <>
            {editTitleModal && <EditTitle
                album={album}
                active={editTitleModal}
                setModal={setEditTitleModal}
                onTitleChange={handleTitleChange}
            />}
            {deleteAlbumModal && <DeleteAlbum album={album} active={deleteAlbumModal}  setModal={setDeleteAlbumModal}
                                              handleDelete={handleDeleteAlbum}/>}
            <div className={styles.album_item}>
                <div className={styles.album_image} onMouseEnter={handleToggleDropdown} onMouseLeave={handleToggleDropdown}>
                    { album.frame !== 0 &&
                        <div className={styles.frame}>
                            <Link href={`/dashboard/album/${album.id}`} className={styles.link_to_photo}>
                                <Image src={`/frame/frame${album.frame}.apng`} width={239} height={239} alt={'frame'}/>
                            </Link>
                        </div>
                    }
                    <Link href={`/dashboard/album/${album.id}`} className={styles.link_to_photo}>
                        <Image src={album.idLogo ? `http://188.212.124.120:3001/api/download/${album.idLogo}` : '/default-image.png'}
                            alt={album.title}
                            fill={true}
                        />
                    </Link>
                    {isDropdownOpen && (
                        <div className={styles.dropdown_menu}>
                            <Tooltip title="Дополнительные действия">
                                <Dropdown menu={{ items }} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <svg width="24px" height="24px" fill='white' className="v1262d JUQOtc" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                            </svg>
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Tooltip>
                        </div>
                    )}
                </div>
                <div>
                    <Link href={`dashboard/album/${album.id}`} className={styles.link_to_photo}>
                        <h3>{title}</h3>
                    </Link>
                </div>
            </div>
        </>

    );
};

export default AlbumItem;