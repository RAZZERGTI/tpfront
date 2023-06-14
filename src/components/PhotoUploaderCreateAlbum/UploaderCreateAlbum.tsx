import React, {PropsWithChildren} from 'react';
import {DropzoneOptions, useDropzone} from 'react-dropzone';
import * as Api from "@/pages/api"
import {IPhoto} from "@/interfaces/album.interface";
import {GetServerSidePropsContext} from "next";
import nookies from "nookies";


interface IProps {
    children: PropsWithChildren
}

const PhotoUploaderCreate: React.FC<IProps> = ({
                                             children,  setFile
                                         }) => {
    const onDrop = async (acceptedFiles) => {
        console.log(acceptedFiles[0])
        setFile(acceptedFiles[0])
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Перетащите файлы сюда...</p>
            ) : (
                <div style={{height: 40, width: 160}}>
                    { children }
                </div>
            )}
        </div>
    );
};

export default PhotoUploaderCreate;