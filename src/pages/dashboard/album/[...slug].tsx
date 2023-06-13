import { useRouter } from 'next/router';
import styles from '@/components/ui/album/photoPage/Photo.module.scss'
import ImageNext from "next/image";
import React, {useEffect, useRef, useState} from "react";
import HeaderPhotoPage from "@/components/ui/album/photoPage/headerPhotoPage/HeaderPhotoPage";
import {GetServerSidePropsContext} from "next";
import {checkAuth} from "@/utils/checkAuth";
import nookies from "nookies";
import * as Api from "@/pages/api";
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';
import DraggableShape from "@/components/DraggableShape/DraggableShape";
import {AlbumService} from "@/services/album.service";
import ModalReport from "@/components/ui/ModalReport/ModalReport";
import axios from "axios";
import { createCanvas } from 'canvas';
import sharp from 'sharp';
import ImageEditor from '@/components/ui/ImageEditor/ImageEditor';

const PhotoPage = (ctx: GetServerSidePropsContext) => {
    const router = useRouter();
    const { _id } = nookies.get(ctx);
    const { slug } = router.query;
    const [imageUrl, setImage] = useState('')
    useEffect(() => {
    if (slug !== undefined)
        setImage(`http://188.212.124.120:3001/api/download/${slug[2]}`)
    }, [slug]);
    const [photoDimensions, setPhotoDimensions] = useState([100, 100]);
    const [user, setUser] = useState('')
    const getInfos = async () => {
        const userData = await Api.auth.getMe(_id);
        setUser(userData.name)
    }
    const [inputValue, setInputValue] = useState('');
    const getCaption = async () => {
        if (slug){
            const album = await AlbumService.getPhotoById(slug[0]);
            album.map(image => image.idPhoto === slug[2] ? setInputValue(image.caption) : false)
        }
    }
    useEffect(() => {
        getInfos()
    }, [])
    useEffect(() => {
        getCaption()
    }, [slug])
    const [editMenu, setEditMenu] = useState(false)
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleImageLoad = (event) => {
        const { naturalWidth, naturalHeight } = event.target;
        let natHeight = naturalHeight
        let natWidth = naturalWidth
        if (naturalWidth > 1669) {
            natHeight = naturalHeight * 1669 / naturalWidth
            natWidth = 1669
        }
        if (natHeight > 939) {
            natWidth = natWidth * 939 / natHeight
            natHeight = 939
            setPhotoDimensions([natWidth, natHeight]);
        } else if(natWidth === 1669){
            setPhotoDimensions([natWidth, natHeight]);
        }
        else {
            setPhotoDimensions([naturalWidth, naturalHeight]);
        }
    };

    useEffect(() => {
        const img = new Image();
        img.onload = handleImageLoad;
        img.src = imageUrl;
    }, [imageUrl]);
    const [showText, setShowText] = useState(false);

    const containerRef = useRef(null);
    const photoRef = useRef(null);

    const handleSavePhoto = () => {
        savePhoto();
    };
    const [shapes, setShapes] = useState([]);

    const savePhoto = async () => {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const file = new File([response.data], 'photo.jpg', { type: 'image/jpeg' });
        if (slug !== undefined){
            await Api.files.deletePhoto(slug[0], slug[2])
            const fileUpload = await Api.files.upload(file, slug[0], _id, inputValue, showText ? user : '', shapes, selectedColor,
                frameBorder ? frameBorder : '');
            if (fileUpload){
                location.href = `/dashboard/album/${slug[0]}`;
            }
        }
    };
    const dataURLtoBlob = (dataURL) => {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const byteString = atob(parts[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        return new Blob([arrayBuffer], { type: contentType });
    };
    const [activeShapes,  setActiveShapes] = useState(false)
    const handleActiveShapes = () => {
        setActiveShapes(!activeShapes)
    }
    const [nextShapeId, setNextShapeId] = useState(1);

    const handleAddRectangle = () => {
        const newShape = {
            id: nextShapeId,
            type: 'rectangle',
            position: { x: 0, y: 0 },
        };

        setShapes([...shapes, newShape]);
        setNextShapeId(nextShapeId + 1);
    };

    const handleAddCircle = () => {
        const newShape = {
            id: nextShapeId,
            type: 'circle',
            position: { x: 0, y: 0 },
        };

        setShapes([...shapes, newShape]);
        setNextShapeId(nextShapeId + 1);
    };

    const handleShapeDrag = (shapeId, newPosition) => {
        setShapes((prevShapes) =>
            prevShapes.map((shape) =>
                shape.id === shapeId ? { ...shape, position: newPosition } : shape
            )
        );
    };
    const [selectedColor, setSelectedColor] = useState('');
    const [frameBorder, setFrameBorder] = useState(false)
    const [activeReport, setActiveReport] = useState(false)

    console.log(imageUrl)
    const [radiusCircle, setRadiusCircle] = useState(50)
    const [radiusRectangle, setRadiusRectangle] = useState(50)
    const handleCircleRadiusChange = (e) => {
        setRadiusCircle(e.target.value);
    };
    const handleRectangleRadiusChange = (e) => {
        setRadiusRectangle(e.target.value);
    };
    return (
        <div  className={styles.wrapper_photo}>
            { activeReport &&
                <ModalReport idPhoto={slug[2]} idAlbum={slug[0]} idUser={_id} active={activeReport} setModal={setActiveReport}/>
            }
            { editMenu &&
                <div className={styles.edit_menu}>
                    <div className={styles.btn_edit_menu}>
                        {/*<div className={styles.shapes} onClick={() => openShapesEdit()}>*/}
                        {/*    /!*<button >*!/*/}
                        {/*    /!*    <ImageNext*!/*/}
                        {/*    /!*        src={'/elements.svg'}*!/*/}
                        {/*    /!*        alt="My Image"*!/*/}
                        {/*    /!*        width={24}*!/*/}
                        {/*    /!*        height={24} />*!/*/}
                        {/*    /!*</button>*!/*/}
                        {/*</div>*/}
                        {/*<div className={styles.settings_effect} onClick={() => openSettingEffect()}>*/}
                        {/*    <ImageNext*/}
                        {/*        src={'/settings2.svg'}*/}
                        {/*        alt="My Image"*/}
                        {/*        width={24}*/}
                        {/*        height={24} />*/}
                        {/*</div>*/}
                    </div>
                    {/*{settingEffect &&*/}
                    {/*    <>*/}
                    {/*        <div className={styles.elements}>*/}
                    {/*            <p>Контраст</p>*/}
                    {/*            <input*/}
                    {/*                type="range"*/}
                    {/*                min="0"*/}
                    {/*                max="200"*/}
                    {/*                value={contrast}*/}
                    {/*                onChange={handleContrastChange}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div className={styles.elements}>*/}
                    {/*            <p>Яркость</p>*/}
                    {/*            <input*/}
                    {/*                type="range"*/}
                    {/*                min="0"*/}
                    {/*                max="200"*/}
                    {/*                value={brightness}*/}
                    {/*                onChange={handleBrightnessChange}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div className={styles.elements}>*/}
                    {/*            <p>Инверсия цвета</p>*/}
                    {/*            <input*/}
                    {/*                type="range"*/}
                    {/*                min="0"*/}
                    {/*                max="200"*/}
                    {/*                value={invert}*/}
                    {/*                onChange={handleInvertChange}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </>*/}
                    {/*}*/}
                    {/*{ activeShapes &&*/}
                        <>
                            <div className={styles.elements} onClick={handleAddRectangle}>
                                <button>
                                    <ImageNext
                                        src={'/rectangle.svg'}
                                        alt="My Image"
                                        width={24}
                                        height={24} />
                                </button>
                            </div>
                            <div className={styles.elements} onClick={handleAddCircle}>
                                <button >
                                    <ImageNext
                                        src={'/circle.svg'}
                                        alt="My Image"
                                        width={24}
                                        height={24} />
                                </button>
                            </div>
                        </>
                    {/*}*/}
                </div>
            }
            <HeaderPhotoPage imageUrl={imageUrl} selectedColor={selectedColor} setSelectedColor={setSelectedColor}
                             setShape={setShapes} setEditMenu={setEditMenu} editMenu={editMenu} inputText={inputValue}
                             idUser={_id} savePhoto={handleSavePhoto} ids={slug !== undefined ? slug : ''}
                             showText={showText} setShowText={setShowText} frameBorder={frameBorder}
                             setFrameBorder={setFrameBorder} activeReport={activeReport} setActiveReport={setActiveReport}/>
            <div className={styles.photo} ref={containerRef}>
            <div style={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                zIndex: 1000
            }}>
                    {shapes.map((shape) => (
                        <DraggableShape
                            key={shape.id}
                            shape={shape}
                            color={selectedColor}
                            position={shape.position}
                            radiusCircle={radiusCircle}
                            radiusRectangle={radiusRectangle}
                            editMenu={editMenu}
                            onShapeDrag={editMenu ? handleShapeDrag : null}
                        />
                    ))}
                </div>
                    <ImageNext
                        src={imageUrl}
                        alt="My Image"
                        width={photoDimensions[0]}
                        height={photoDimensions[1]}
                        style={frameBorder ? {border: '5px solid', borderColor: selectedColor ? selectedColor : 'red' }
                            : {border: `none` }}
                    />
                {showText && (
                    <div className={styles.diagonal} ref={photoRef}>
                        { user }
                    </div>
                )}
            </div>
            <div className={styles.input_container}>
                <input
                    type="text"
                    placeholder="Введите подпись"
                    className={styles.input}
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};


export default PhotoPage;
