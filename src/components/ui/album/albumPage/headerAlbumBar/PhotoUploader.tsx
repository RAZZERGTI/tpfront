import React, {PropsWithChildren} from 'react';
import {DropzoneOptions, useDropzone} from 'react-dropzone';
import * as Api from "@/pages/api"
import {IPhoto} from "@/interfaces/album.interface";
import {GetServerSidePropsContext} from "next";
import nookies from "nookies";
import {upload, uploadVideo} from "@/pages/api/files";


interface IProps {
    children: PropsWithChildren
    idAlbum: string | string[] | undefined
}

const PhotoUploader: React.FC<IProps> = ({
    children, idAlbum
}, ctx: GetServerSidePropsContext) => {
    const { _id } = nookies.get(ctx);
    const onDrop = async (acceptedFiles) => {
        console.log(acceptedFiles[0])
        const file = acceptedFiles[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                console.log('Ширина:', width);
                console.log('Высота:', height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        const fileUpload = await Api.files.uploadPhoto(acceptedFiles[0], idAlbum, _id, '')
        // const fileUpload = await Api.files.uploadVideo(acceptedFiles[0], idAlbum, _id, '')
        console.log(fileUpload)
        if (fileUpload.data){
            window.location.reload()
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Перетащите файлы сюда...</p>
            ) : (
                <div>
                    { children }
                </div>
            )}
        </div>
    );
};

export default PhotoUploader;