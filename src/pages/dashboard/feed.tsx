import React, {useEffect, useState} from 'react';
import Layout from "@/components/layout/Layout";
import {DashboardLayout} from "@/layouts/DashboardLayout";
import {GetServerSidePropsContext, NextPage} from "next";
import nookies from "nookies";
import {IImagesId} from "@/interfaces/album.interface";
import {AlbumService} from "@/services/album.service";
import Image from 'next/image'
import styles from "@/components/Feel/Feel.module.scss";
import Link from "next/link";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import NonFeed from "@/components/Feel/NonFeed";

const DashboardFeel: NextPage = (ctx: GetServerSidePropsContext) => {
    const { _id } = nookies.get(ctx);
    const [albumData, setAlbumData] = useState<IImagesId[]>([])
    console.log(albumData)
    const getImages = async () => {
        const album = await AlbumService.getFeelById(String(_id));
        setAlbumData(album)
    }
    useEffect(() => {
        getImages()
    }, [_id]);
    const [data, setData] = useState({img: '', i:0})
    const viewImage = (img, i) => {
        setData({img, i})
    }
    const imgAction = (action) => {
        let i =  data.i
        if (action === 'next-img'){
            setData({img: albumData[i+1], i: i + 1})
        }
        if (action === 'previous-img'){
            setData({img: albumData[i-1], i: i-1})
        }
        if (!action){
            setData({img: '', i: 0})
        }
    }
    return (
        <>
                {/*{data.img &&*/}
                {/*    <div style={{*/}
                {/*        width: '100%',*/}
                {/*        height: '100vh',*/}
                {/*        background: 'black',*/}
                {/*        position: 'absolute',*/}
                {/*        display: 'flex',*/}
                {/*        justifyContent: 'center',*/}
                {/*        alignItems: 'center',*/}
                {/*        overflow: 'hidden'*/}
                {/*    }}>*/}
                {/*        <button style={{position: 'absolute', top: '10px', right: '10px'}}>*/}
                {/*            <Image src={'/close.svg'} alt={'close'} width={32} height={32}/>*/}
                {/*        </button>*/}
                {/*        <button onClick={() => imgAction('previous-img')}>*/}
                {/*            Previous*/}
                {/*        </button>*/}
                {/*        <img src={data.img} style={{width: 'auto', maxWidth: '90%', maxHeight: '90%'}} alt=""/>*/}
                {/*        <button onClick={() => imgAction('next-img')}>*/}
                {/*            >*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*}*/}
            { albumData.length > 0 ?
            <div style={{padding: '10px'}}>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry gutter={'10px'}>
                        { albumData.map((image,i) =>
                            // <div className={styles.album_item}>
                            //     <div className={styles.album_image} >
                            //         <Link href={`/dashboard`} className={styles.link_to_photo}>
                            //             <Image src={`http://188.212.124.120:3001/api/download/${image.idPhoto}`}
                            //                    alt={'Feel-photo'}
                            //                    height={239} width={239}
                            //             />
                            //         </Link>
                            //     </div>
                            // </div>

                                // className={styles.link_to_photo}
                                <img src={`http://188.212.124.120:3001/api/download/${image.idPhoto}`} key={i}
                                     alt={'Feel-photo'} style={{width: "100%", display: "block"}}
                                     onClick={() => viewImage(`http://188.212.124.120:3001/api/download/${image.idPhoto}`, i)}
                                />
                        ) }
                    </Masonry>
                </ResponsiveMasonry>
            </div>
                : <NonFeed/>}
        </>
    );
};
DashboardFeel.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Лента">{page}</Layout>;
};
export default DashboardFeel;