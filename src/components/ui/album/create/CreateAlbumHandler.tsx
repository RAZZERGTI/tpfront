import React, {useState} from 'react';
import styles from './CreateAlbumHandler.module.scss'
import {useRouter} from "next/router";
import nookies from "nookies";
import * as Api from "@/pages/api";
import { UploadFile} from "antd";
import {GetServerSidePropsContext} from "next";
import PhotoUploaderCreate from "@/components/PhotoUploaderCreateAlbum/UploaderCreateAlbum";
import FrameModal from "@/components/FrameModal/FrameModal";
import HeaderAlbumBar from "@/components/ui/album/albumPage/headerAlbumBar/HeaderAlbumBar";
import HeaderCreateAlbum from "@/components/ui/album/create/HeaderCreateAlbum";

const CreateAlbumHandler = ( ctx: GetServerSidePropsContext) => {
    const [albumName, setAlbumName] = useState('')
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const router = useRouter();
    const onUploadSuccess = async () => {
        try {
            const { _id } = nookies.get(ctx);
            const file = await Api.files.createAlbum(fileList, albumName, _id, frame)
            setFileList([]);
            await router.push('/dashboard');
        } catch (err) {
            console.log(err)
        }
    };
    const [activeModal, setActiveModal] = useState(false)
    const [frame, setFrame] = useState(0)
    return (
        <div style={{display: "flex"}}>
            <HeaderCreateAlbum/>
            <div className={styles.wrapper}>
                {activeModal && <FrameModal setFrame={setFrame} active={activeModal} setModal={setActiveModal}/>}
                <div>
                    <textarea type="text"
                              placeholder='Добавьте название' onChange={e => setAlbumName(e.target.value)}
                              value={albumName} className={styles.main_input}
                    />
                    <div className={styles.button_create}>
                        <button className={styles.btn_select} onClick={() => setActiveModal(true)}>
                            Выбрать рамку
                        </button>
                        <PhotoUploaderCreate setFile={setFileList}>
                            <button className={styles.btn_upload}>
                                Загрузить логотип
                            </button>
                        </PhotoUploaderCreate>
                        <button className={albumName ? styles.btn_select : styles.disabled } disabled={!albumName} onClick={onUploadSuccess}>
                            Сохранить альбом
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAlbumHandler;