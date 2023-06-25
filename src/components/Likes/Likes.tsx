import React, {useEffect, useState} from 'react';
import styles from './Likes.module.scss'
import NonLikes from "@/components/Likes/NonLikes";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import nookies from "nookies";
import {ILikes} from "@/interfaces/album.interface";
import {GetServerSidePropsContext} from "next";
import * as Api from "@/pages/api";
import Image from "next/image";

interface LikesPageProps {
    _id: string;
}

const LikesPage: React.FC<LikesPageProps> = ({ _id }) => {
    const [likesData, setLikesData] = useState<ILikes[]>([])
    
    console.log(likesData)

    const getImages = async () => {
        const album = await Api.files.getLikesById(String(_id));
        console.log(album)
        setLikesData(album)
    }
    const handleActiveLike = async (idPhoto: string) => {
        let updatedLikes: ILikes[];

        if (likesData.some((photo) => photo.idPhoto === idPhoto)) {
            updatedLikes = likesData.filter((photo) => photo.idPhoto !== idPhoto);
            await Api.files.deleteLike(idPhoto);
        } else {
            updatedLikes = [...likesData, { idPhoto }];
            await Api.files.setLike(idPhoto, idAlbum, _id);
        }

        setLikesData(updatedLikes);
    };
    useEffect(() => {
        getImages()
    }, [_id]);
    return (
        <div>
            {likesData.length > 0 ?
            <div style={{padding: '10px'}}>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry gutter={'10px'}>
                        {likesData.map((image,i) =>
                            <div style={{position: "relative"}}>
                                <div
                                    className={styles.btn_like}
                                    onClick={() => handleActiveLike(image.idPhoto)}
                                >
                                    <Image
                                        src={
                                            likesData.some((photo) => photo.idPhoto === image.idPhoto)
                                                ? '/likeRed.svg'
                                                : '/LikeWhite.svg'
                                        }
                                        alt={'like'}
                                        height={24}
                                        width={24}
                                    />
                                </div>
                                <div className={styles.photos}>
                                    <img src={`http://188.212.124.120:3001/api/download/${image.idPhoto}`} key={i}
                                         alt={'Feel-photo'} style={{width: "100%", display: "block"}}
                                    />
                                </div>
                            </div>
                        )}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
                : <NonLikes /> }
        </div>
    );
};
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { _id } = nookies.get(ctx);
    return {
        props: { _id },
    };
};

export default LikesPage;
