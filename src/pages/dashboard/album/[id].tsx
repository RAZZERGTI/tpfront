import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AlbumPage from '@/components/ui/album/albumPage/AlbumPage';
import { IAlbumDataSingle, IImagesId, IPhotoDataSingle } from '@/interfaces/album.interface';
import { AlbumService } from '@/services/album.service';

const AlbumWrapper: FC<IPhotoDataSingle> = () => {
    const router = useRouter();
    const { id } = router.query;
    const [albumData, setAlbumData] = useState<IImagesId[]>([])
    console.log(albumData)
    const getImages = async () => {
        const album = await AlbumService.getPhotoById(String(id));
        setAlbumData(album)
    }
    useEffect(() => {
        getImages()
    }, [id]);
    return (
        <div>
            <AlbumPage idImages={ albumData } idAlbum={id} />
        </div>
    );
};


export default AlbumWrapper;
