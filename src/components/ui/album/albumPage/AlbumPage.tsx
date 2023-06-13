import React, {useEffect, useState} from 'react';
import styles from './AlbumPage.module.scss'
import {useRouter} from "next/router"
import {IAlbum, IAlbumDataSingle, IAlbumInfo, IImagesId} from "@/interfaces/album.interface";
import HeaderAlbumBar from "@/components/ui/album/albumPage/headerAlbumBar/HeaderAlbumBar";
import TitleAlbum from "@/components/ui/album/albumPage/titleAlbum/TitleAlbum";
import PhotoAlbum from "@/components/ui/album/albumPage/photoAlbum/PhotoAlbum";
import NonAlbum from "@/components/ui/album/albumPage/nonAlbum/NonAlbum";

interface IProps {
    idImages: IImagesId[]
    idAlbum: string | string[] | undefined
}

const AlbumPage: React.FC<IProps> = ({
   idImages, idAlbum
}) => {
    const router = useRouter();
    const selectedMenu = router.pathname;
    console.log('HLoh -- ',idImages)
    console.log('HLoh -- ', idImages.length)
    return (
        <>
            <HeaderAlbumBar idAlbum={idAlbum} idImages={idImages}/>
            <main className={styles.album_page}>
                <div className={styles.container}>
                    <TitleAlbum idAlbum={idAlbum}/>
                    {idImages.length < 1 &&
                        <NonAlbum idAlbum={idAlbum}/>
                    }
                    <PhotoAlbum idAlbum={idAlbum} idImages={idImages}/>
                </div>
            </main>
        </>
    );
};

export default AlbumPage;