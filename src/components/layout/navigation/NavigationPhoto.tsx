import React from 'react';
import styles from './Navigation.module.scss'
import Links from "@/components/layout/header/Links";
import {useRouter} from "next/router";

const NavigationPhoto = (idAlbum: string | string[] | undefined) => {
    const { pathname } = useRouter()
    return (
        <div className={styles.navigation}>
            <div>
                <Links linkJPG={pathname === `/dashboard/album/${idAlbum.idAlbum}` ? '/redImages/albumRed.svg' : '/album.svg'}
                       name='Фото' href={`/dashboard/album/${idAlbum.idAlbum}`}
                        idAlbum={idAlbum.idAlbum}/>
                <Links linkJPG={pathname === `/dashboard/album/trash` ? '/redImages/searchRed.svg' : '/searchBlack.svg'} name='Корзина' href={`/dashboard/album/trash`} />
            </div>
        </div>
    );
};

export default NavigationPhoto;