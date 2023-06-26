import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navigation.module.scss';
import Links from '@/components/layout/header/Links';
import { useRouter } from 'next/router';
import ModalHelp from '@/components/ui/ModalHelp/ModalHelp';
import { Tooltip } from 'react-tippy';

const Navigation: React.FC = () => {
    const { pathname } = useRouter();
    const [active, setActive] = useState(false);
    const [shouldHideNavigation, setShouldHideNavigation] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Проверяем наличие скролла по высоте страницы
            const hasVerticalScroll = window.innerHeight < document.body.scrollHeight;

            // Если есть скролл, скрываем навигацию
            setShouldHideNavigation(hasVerticalScroll);
        };

        // При монтировании компонента добавляем слушатель события прокрутки
        window.addEventListener('scroll', handleScroll);

        // При размонтировании компонента удаляем слушатель события прокрутки
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.navigation}>
            {active && <ModalHelp active={active} setActive={setActive} />}
            <div>
                <Links linkJPG={pathname === '/dashboard' ? '/redImages/albumRed.svg' : '/album.svg'} name="Альбомы" href="/dashboard" />
                <Links linkJPG={pathname === '/dashboard/feed' ? '/redImages/feelRed.svg' : '/feel.svg'} name="Лента" href="/dashboard/feed" />
                <Links linkJPG={pathname === '/dashboard/likes' ? '/redImages/likeRed.svg' : '/like.svg'} name="Лайки" href="/dashboard/likes" />
            </div>
            <div>
                {shouldHideNavigation && pathname === '/dashboard' && (
                    <Tooltip title="Справка">
                        <button className={styles.help} onClick={() => setActive(true)}>
                            <Image src="/help.svg" height={30} width={30} alt="Help" />
                        </button>
                    </Tooltip>
                )}
            </div>
        </div>
    );
};

export default Navigation;
