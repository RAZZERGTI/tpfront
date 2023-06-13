import Head from "next/head";
import { Header } from "@/components/Header";
import React from "react";

import styles from "@/styles/Home.module.scss";
import Navigation from "@/components/layout/navigation/Navigation";

interface LayoutProps {
  title: string;
}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Header />
          {title !== 'Dashboard / Профиль' && <Navigation />}
        <div className={styles.main}>
          <div className={styles.layout}>{children}</div>
        </div>
      </main>
    </>
  );
};
