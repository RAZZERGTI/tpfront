import React from 'react';
import styles from "@/components/ui/album/albumPage/headerAlbumBar/HeaderAlbumBar.module.scss";
import Link from "next/link";
import Image from "next/image";

const HeaderCreateAlbum = () => {
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
            </div>
    );
};

export default HeaderCreateAlbum;