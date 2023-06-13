import React from 'react';
import HeaderText from "@/components/ui/AdminPanel/HeaderText/HeaderText";
import NavigationAdmin from "@/components/ui/AdminPanel/NavigationAdmin/NavigationAdmin";
import styles from './AdminPanel.module.scss'
import Header from "@/components/ui/AdminPanel/HeaderText/HeaderText";
import FeedbackAdmin from "@/components/ui/AdminPanel/FeedbackAdmin/FeedbackAdmin";

const AdminPanel = () => {
    return (
        <div>
            <HeaderText text={'Админ панель'} />
            <NavigationAdmin />
            <div className={styles.content}>
                <FeedbackAdmin/>
            </div>
        </div>
    );
};

export default AdminPanel;