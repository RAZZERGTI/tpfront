import React from 'react';
import {inspect} from "util";
import styles from './CreateAlbumHandler.module.scss'

const CreateAlbumHandler = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <textarea type="text" placeholder='Добавьте название' className={styles.main_input}/>
                <div className={styles.button_create}>
                    <button className={styles.btn}>Добавить фото</button>
                </div>
            </div>
        </div>
    );
};

export default CreateAlbumHandler;