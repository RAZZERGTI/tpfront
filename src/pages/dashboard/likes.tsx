import React from 'react';
import Layout from "@/components/layout/Layout";
import {DashboardLayout} from "@/layouts/DashboardLayout";
import LikesPage from "@/components/Likes/Likes";

const Likes = () => {
    return (
        <DashboardLayout>
            <LikesPage />
        </DashboardLayout>
    );
};
Likes.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Лайки">{page}</Layout>;
};
export default Likes;