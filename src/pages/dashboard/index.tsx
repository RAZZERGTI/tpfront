import { GetServerSidePropsContext, NextPage } from "next";
import { checkAuth } from "@/utils/checkAuth";
import React from "react";
import  Layout  from "@/components/layout/Layout";

import * as Api from "@/pages/api";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import {AlbumService} from "@/services/album.service";
import Home from "@/components/screens/home/Home";
import {IAlbumData} from "@/interfaces/album.interface";
import nookies from "nookies";

const DashboardPage: NextPage<IAlbumData> = ( {albums}) => {
    return (
        <DashboardLayout>
            <Home albums={albums} />
        </DashboardLayout>
    );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Главная">{page}</Layout>;
};
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { _id } = nookies.get(ctx);
    const authProps = await checkAuth(ctx);
    if ("redirect" in authProps) {
        return authProps;
    }
    const albums = await AlbumService.getAllAlbums(_id)

    return{
        props: {albums}
    }

}

export default DashboardPage;