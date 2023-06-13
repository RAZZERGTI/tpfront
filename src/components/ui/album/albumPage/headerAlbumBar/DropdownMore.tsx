import React, {useState} from 'react';
import {Dropdown, MenuProps, Space} from "antd";
import Image from "next/image";


const DropdownMore = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const items: MenuProps['items'] = [
        // {
        //     key: '1',
        //     label: (
        //         <a rel="noopener noreferrer"
        //            // onClick={() =>setEditTitleModal(true)}
        //         >
        //             Скачать все фото
        //         </a>
        //     ),
        // },
        // {
        //     key: '1',
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        //             Настройки
        //         </a>
        //     ),
        // },
        {
            key: '1',
            label: (
                <a rel="noopener noreferrer"
                   // onClick={() => setDeleteAlbumModal(true)}
                >
                    Удалить альбом
                </a>
            ),
        },
    ];
    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Image src={`/headerBarAlbum/more.svg`}
                           alt={'previous'}
                           width={24}
                           height={24}
                    />
                </Space>
            </a>
        </Dropdown>
    );
};

export default DropdownMore;