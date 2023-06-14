import React from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import {IAlbumData} from "@/interfaces/album.interface";
import Home from "@/components/screens/home/Home";
import {AlbumService} from "@/services/album.service";
import nookies from "nookies";

const HomePage: NextPage<IAlbumData> = ({albums}) => {
    return (
        <Home albums={albums} />
    );
};

export const getServerSideProps: GetServerSideProps<IAlbumData> = async (ctx: GetServerSidePropsContext) => {
    const { _id } = nookies.get(ctx);
    const albums = await AlbumService.getAllAlbums(_id)

    return{
        props: {albums}
    }
}

export default HomePage;