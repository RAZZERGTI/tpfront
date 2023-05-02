import React, {FC} from 'react';
import { IAlbumDataSingle} from "@/interfaces/album.interface";
import Image from "next/image";
import styles from './AlbumItem.module.scss'

const AlbumItem: FC<IAlbumDataSingle> = ({album}) => {
    return (
        <div className={styles.album_item}>
            <img src={album.idLogo} alt={album.title} width={200} height={200} />
            <h3>{album.title}</h3>
        </div>
    );
};

export default AlbumItem;