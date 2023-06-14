import React, {FC, useState} from 'react';
import Link from "next/link";
import styles from './Header.module.scss'
import Image from "next/image";

const Header: FC = () => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <header className={styles.header}>
            <div className={styles.logo_wrapper}>
                <div className={styles.logo_text}>
                    <a href="/">
                        <span className={styles.logo}></span>
                    </a>
                </div>
            </div>
            <div className={styles.main_header}>
                <div className={`${styles.search_row} ${isFocused ? "active" : ""}`}>
                    <div className={styles.search}>
                        <div className={styles.search_image}>
                            <Image src='/search.svg' alt='search-icon' width={24} height={24} />
                        </div>
                        <div className={styles.search_input}>
                            <div className={styles.search_input_view} >
                                <input type="text" placeholder='Поиск фото'
                                       onFocus={handleFocus}
                                       onBlur={handleBlur}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.btn}>
                        <Link href='./createAlbum' className={styles.btn_import}>
                            <div className={styles.import}>
                                    <span>
                                        <Image src='/plus.svg' className={styles.import_image} alt='search-icon' width={18} height={18} />
                                    <p>Добавить</p>
                                    </span>
                            </div>
                        </Link>
                        <button className={styles.btn_question}><Image src='/question.svg' alt='search-icon' width={24} height={24} /></button>
                        <button className={styles.btn_settings}><Image src='/settings.svg' alt='search-icon' width={24} height={24} /></button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;