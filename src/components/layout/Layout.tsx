import React, {FC, PropsWithChildren} from 'react';
import Header from "@/components/layout/header/Header";
import Navigation from "@/components/layout/navigation/Navigation";
import styles from "./Layout.module.scss"

const Layout: FC<PropsWithChildren<unknown>> = ({children}) => {
    return (
        <div>
            <Header />
            <Navigation />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Layout;