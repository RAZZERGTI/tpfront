import React, {FC, useEffect, useState} from 'react';
import {IImagesId} from "@/interfaces/album.interface";
import styles from './PhotoAlbum.module.scss'
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import * as Api from "@/pages/api";
import nookies from "nookies";
import {GetServerSidePropsContext} from "next";

interface IProps {
    idAlbum: string | string[] | undefined
    idImages: IImagesId[]
}

const PhotoAlbum:FC<IProps> = ({idAlbum, idImages}, ctx: GetServerSidePropsContext) => {
    const [activeLikes, setActiveLikes] = useState<string[]>([]);
    const { _id } = nookies.get(ctx);
    useEffect(() => {
        fetchLikes();
    }, [_id]);

    const fetchLikes = async () => {
        try {
            const response = await Api.files.getLikesById(String(_id))
            console.log(response)
            const photoLikes = response.map((like: any) => like.idPhoto);
            setActiveLikes(photoLikes);
        } catch (error) {
            console.error('Ошибка при загрузке лайков:', error);
        }
    };
    const handleActiveLike = async (idPhoto: string) => {
        let updatedLikes: string[];

        if (activeLikes.includes(idPhoto)) {
            updatedLikes = activeLikes.filter((photoId) => photoId !== idPhoto);
            await Api.files.deleteLike(idPhoto)
        } else {
            updatedLikes = [...activeLikes, idPhoto];
            const setLike = await Api.files.setLike(idPhoto, idAlbum, _id)
        }
        setActiveLikes(updatedLikes);
    };
    return (
        <div className={styles.wrapper_photo} >
                {idImages && idImages.map(image => (
                    <div style={{position: "relative"}}>
                        <div
                            className={styles.btn_like}
                            onClick={() => handleActiveLike(image.idPhoto)}
                        >
                            <Image
                                src={
                                    activeLikes.includes(image.idPhoto)
                                        ? '/likeRed.svg'
                                        : '/LikeWhite.svg'
                                }
                                alt={'like'}
                                height={24}
                                width={24}
                            />
                        </div>
                        <div className={styles.caption}>
                            { image.caption }
                        </div>
                        <div className={styles.photos}>
                            <Link href={`${idAlbum}/photo/${image.idPhoto}`}>
                                <Image key={image.idPhoto}
                                       src={`http://188.212.124.120:3001/api/download/${image.idPhoto}`}
                                       alt={'previous'}
                                       fill={true}/>
                            </Link>
                        </div>
                    </div>

                ))}
        </div>
    );
};

export default PhotoAlbum;