import { Header } from "@/components/Header";
import React from "react";

import styles from "./Layout.module.scss";
import Head from "next/head";
import Navigation from "@/components/layout/navigation/Navigation";
import NavigationPhoto from "@/components/layout/navigation/NavigationPhoto";

interface LayoutProps {
    title: string;
    idAlbum: string | string[] | undefined
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({title, children, idAlbum}) => {
    return (
        // <div>
        //     <Header />
        //     <Navigation />
        //     <div className={styles.content}>
        //         {children}
        //     </div>
        // </div>
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <Header />
                <NavigationPhoto idAlbum={idAlbum} />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
