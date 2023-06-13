import React from 'react';
import PhotoUploader from "@/components/ui/album/albumPage/headerAlbumBar/PhotoUploader";
import styles from './NonAlbum.module.scss'
import Image from 'next/image'
const NonAlbum = ({idAlbum}: string) => {
    return (
        <div className={styles.empty_wrapper}>
            <div className={styles.empty_container}>
                <p>Альбом пуст.</p>
                <PhotoUploader idAlbum={idAlbum}>
                    <button className={styles.btn_upload_photo}>
                        Добавить фото
                    </button>
                </PhotoUploader>
                <Image src={`/empty.svg`}
                       alt={'previous'}
                       width={220}
                       height={204}/>
            </div>
        </div>
    );
};

export default NonAlbum;