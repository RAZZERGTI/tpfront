import React from 'react';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import {inspect} from "util";
import styles from './AlbumItem.module.scss'

const Helper = () => {
    return (
        <div className={styles.helper}>
            <h2>Чтобы быть на связи с друзьями и близкими, создайте общие альбомы,
            в которые каждый сможет добавить свои файлы
            </h2>
            <Link href='./createAlbum' className={styles.btn_create}/>
        </div>
    );
};

export default Helper;