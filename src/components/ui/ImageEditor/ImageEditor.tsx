import React, { useState } from 'react';
import ImageCrop from 'react-image-crop';
import AvatarEditor from 'react-avatar-editor';

const ImageEditor = () => {
    const [image, setImage] = useState(`http://188.212.124.120:3001/api/download/5rgjdc006ada69a94436d8052b2556415ac09`);
    const [crop, setCrop] = useState({
        aspect: 1, // Соотношение сторон обрезки (1:1)
        width: 50, // Ширина обрезки в процентах
    });
    const [rotation, setRotation] = useState(0);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
    };

    const handleCropChange = (crop) => {
        setCrop(crop);
    };

    const handleRotationChange = (e) => {
        setRotation(parseInt(e.target.value));
    };

    const handleCropImage = () => {
        // Вы можете выполнить действия с обрезанным и перевернутым изображением здесь
        console.log('Crop and rotate image');
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && (
                <div>
                    <h2>Переворот</h2>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={rotation}
                        onChange={handleRotationChange}
                    />
                    <h2>Обрезка</h2>
                    <ImageCrop
                        src={image}
                        crop={crop}
                        onChange={handleCropChange}
                        onComplete={handleCropImage}
                    />
                    <AvatarEditor
                        image={image}
                        width={200}
                        height={200}
                        border={50}
                        color={[255, 255, 255, 0.6]}
                        rotate={rotation}
                        scale={1}
                    />
                    <button onClick={handleCropImage}>Обрезать и перевернуть</button>
                </div>
            )}
        </div>
    );
};

export default ImageEditor;
