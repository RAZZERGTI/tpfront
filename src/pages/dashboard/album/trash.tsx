import React from 'react';
import Layout from "@/components/layout/Layout";
import {DashboardLayout} from "@/layouts/DashboardLayout";

const Likes = () => {
  return (
      <DashboardLayout>
        <h1>В разработке...</h1>
      </DashboardLayout>
  );
};
Likes.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Лайки">{page}</Layout>;
};
export default Likes;