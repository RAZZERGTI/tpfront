import React from 'react';
import styles from "@/styles/Profile.module.scss";
import Image from 'next/image'

const Logo = ({idLogo}:any) => {
    console.log(idLogo)
    return (
        <div className={styles.logo}>
            <Image className={styles.inner_image}
                src={idLogo ? `http://188.212.124.120:3001/api/download/${idLogo}` : '/default-image.png'}
                   fill={true}  alt={'Logo'}/>
        </div>
    );
};

export default Logo;