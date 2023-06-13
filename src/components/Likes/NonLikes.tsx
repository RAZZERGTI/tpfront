import React from 'react';
import styles from './Likes.module.scss'
const NonLikes = () => {
    return (
        <div className={styles.plug}>
            <h2>
                Нет лайкнутых фото, но это не означает, что моменты не были значимыми
            </h2>
        </div>
    );
};

export default NonLikes;