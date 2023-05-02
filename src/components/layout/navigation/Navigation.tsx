import React from 'react';
import Image from "next/image";
import styles from './Navigation.module.scss'
import Links from "@/components/layout/header/Links";
import {useRouter} from "next/router";

const Navigation = () => {
    const { pathname } = useRouter()
    return (
        <div className={styles.navigation}>
            <div>
                <Links linkJPG={pathname === '/' ? '/redImages/albumRed.svg' : '/album.svg'} name='Альбомы' href='./'/>
                <Links linkJPG={pathname === '/search' ? '/redImages/searchRed.svg' : '/searchBlack.svg'} name='Расширенный поиск' href='./search' />
                <Links linkJPG={pathname === '/feel' ? '/redImages/feelRed.svg' : '/feel.svg'} name='Лента' href='./feel' />
                <Links linkJPG={pathname === '/likes' ? '/redImages/likeRed.svg' : '/like.svg'} name='Лайки' href='./likes' />
            </div>
        </div>
    );
};

export default Navigation;