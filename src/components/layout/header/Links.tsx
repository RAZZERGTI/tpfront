import React, {FC} from 'react';
import styles from "@/components/layout/navigation/Navigation.module.scss";
import Image from "next/image";
import {useRouter} from "next/router";
import Link from "next/link";

interface IProps {
    linkJPG: string
    name: string
    href: string
}

const Links:FC<IProps> = ({ linkJPG, name,href}) => {
    const { pathname } = useRouter()

    return (
        <div className={styles.link}>
            <Link href={href} className={
            pathname === '/' && name === 'Альбомы' ||
            pathname === '/search' && name === 'Расширенный поиск' ||
            pathname === '/feel' && name === 'Лента' ||
            pathname === '/likes' && name === 'Лайки'
                ? styles.active : ''}>
                <div className={styles.image}>
                    <Image src={linkJPG} alt={`${href}-icon`} width={24} height={24} />
                </div>
                <div className={styles.name}><p>{name}</p></div>
            </Link>
        </div>
    );
};

export default Links;