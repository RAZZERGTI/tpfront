import React, {FC} from 'react';
import {Inter} from "next/font/google";
import Layout from "@/components/layout/Layout";
import {IAlbumData} from "@/interfaces/album.interface";
import AlbumItem from "@/components/ui/album/AlbumItem";
import styles from './Home.module.scss'
import Helper from "@/components/ui/album/Helper";

const inter = Inter({ subsets: ['latin'] })

const Home: FC<IAlbumData> = ({albums}) => {
    return (
        <Layout>
            <div className={styles.albums}>
                {albums.length ? albums.map(album => <AlbumItem key={album.id} album={album}/>) : <Helper />}
            </div>
        </Layout>
    );
};

export default Home;