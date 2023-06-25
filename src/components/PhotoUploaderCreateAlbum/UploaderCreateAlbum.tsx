import React, { PropsWithChildren } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
    children: PropsWithChildren<any>;
    setFile: (file: File) => void;
}

const PhotoUploaderCreate: React.FC<IProps> = ({ children, setFile }) => {
    const onDrop = async (acceptedFiles: File[]) => {
        console.log(acceptedFiles[0]);
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Перетащите файлы сюда...</p>
            ) : (
                <div style={{ height: 40, width: 160 }}>{children}</div>
            )}
        </div>
    );
};

export default PhotoUploaderCreate;
