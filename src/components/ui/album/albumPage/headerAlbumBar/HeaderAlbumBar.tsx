import React, {FC} from 'react';
import styles from './HeaderAlbumBar.module.scss'
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tippy";
import DropdownMore from "@/components/ui/album/albumPage/headerAlbumBar/DropdownMore";
import PhotoUploader from "@/components/ui/album/albumPage/headerAlbumBar/PhotoUploader";
import {IImagesId} from "@/interfaces/album.interface";
interface IProps {
    idAlbum: string | string[] | undefined
    idImages: IImagesId[]
}
const HeaderAlbumBar:FC<IProps> = ({idAlbum, idImages}) => {
    console.log(idAlbum)
    return (
        <div className={styles.header_bar}>
            <div className={styles.previous_btn}>
                <Link href={'/dashboard'}>
                    <Image src={`/headerBarAlbum/previous.svg`}
                           alt={'previous'}
                           width={24}
                           height={24}
                    />
                </Link>
            </div>
            { idImages && idImages.length > 0 &&
                <div className={styles.btn}>
                    <Tooltip title="Добавить фото">
                        <button className={styles.previous_btn}>
                            <PhotoUploader idAlbum={idAlbum}>
                                <Image src={`/headerBarAlbum/image-add2.svg`}
                                       alt={'previous'}
                                       width={24}
                                       height={24}
                                />
                            </PhotoUploader>
                        </button>
                    </Tooltip>
                </div>
            }
        </div>
    );
};

export default HeaderAlbumBar;