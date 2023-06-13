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
import {Header} from "@/components/Header";
import AdminPanel from "@/components/ui/AdminPanel/AdminPanel";

const Reports = () => {
    return (
        <AdminPanel/>
    );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { _id } = nookies.get(ctx);
    if (_id == null){
        const authProps = await checkAuth(ctx);
        if ("redirect" in authProps) {
            return authProps;
        }
    }
    return {
        props: {}
    }
}

export default Reports;