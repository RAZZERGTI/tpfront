import React from 'react';
import Layout from "@/components/layout/Layout";
import {DashboardLayout} from "@/layouts/DashboardLayout";
import Likes from "@/pages/dashboard/likes";

const Search = () => {
    return (
        <DashboardLayout>
            <h1>В разработке...</h1>
        </DashboardLayout>
    );
};
Search.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Поиск">{page}</Layout>;
};
export default Search;