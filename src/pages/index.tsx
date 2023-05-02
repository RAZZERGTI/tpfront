import React from 'react';
import {GetServerSideProps, NextPage} from "next";
import {IAlbumData} from "@/interfaces/album.interface";
import Home from "@/components/screens/home/Home";
import {AlbumService} from "@/services/album.service";

const HomePage: NextPage<IAlbumData> = ({albums}) => {
    return (
        <Home albums={albums} />
    );
};

export const getServerSideProps: GetServerSideProps<IAlbumData> = async () => {
    const albums = await AlbumService.getAllAlbums()

    return{
        props: {albums}
    }
}

export default HomePage;