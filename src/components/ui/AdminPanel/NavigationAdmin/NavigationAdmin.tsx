import React from 'react';
import styles from './NavigationAdmin.module.scss'
import Links from "@/components/layout/header/Links";
import * as Api from "@/pages/api";
import Image from 'next/image'

const NavigationAdmin = () => {
    const logoutFromAdmin = () => {
        Api.auth.logout()
        location.href = "/dashboard/auth";
    }
    return (
        <div className={styles.navigation}>
            <div>
                <button className={styles.exit}
                    onClick={logoutFromAdmin}>
                    <Image src={'/exit.svg'} height={25} width={25} alt={'exit'}/>
                    <p>Выход</p>
                </button>
            </div>
        </div>
    );
};

export default NavigationAdmin;