import React, {FC, useState} from 'react';
import {Inter} from "next/font/google";
import Layout from "@/components/layout/Layout";
import {IAlbumData} from "@/interfaces/album.interface";
import AlbumItem from "@/components/ui/album/AlbumItem";
import styles from './Home.module.scss'
import Helper from "@/components/ui/album/Helper";
import {DashboardLayout} from "@/layouts/DashboardLayout";

const inter = Inter({ subsets: ['latin'] })

const Home: FC<IAlbumData> = ({albums}) => {
    const [albumData, setAlbumData] = useState(albums);

    const handleDeleteAlbum = (albumId) => {
        const updatedAlbums = albumData.filter((album) => album.id !== albumId);
        setAlbumData(updatedAlbums);
    };
    return (
        <div className={styles.albums}>
            {albumData.length ? albumData.map(album => <AlbumItem key={album.id} album={album} handleDeleteAlbum={handleDeleteAlbum}/>) : <Helper />}
        </div>
    );
};

export default Home;