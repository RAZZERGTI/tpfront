import React, {FC} from 'react';
import styles from "./HeaderText.module.scss";

interface Props {
    text: string;
}

const Header: FC<Props> = ({text}) => {
    return (
        <div className={styles.title}>
            <h2>{text}</h2>
        </div>
    );
};

export default Header;