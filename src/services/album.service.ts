import axios from "axios";
import {IAlbum, IImagesId} from "@/interfaces/album.interface";
const API_URL = 'http://188.212.124.120:3001'

axios.defaults.baseURL = API_URL

export const AlbumService = {
    async getAllAlbums(idUser: string) {
        const { data } = await axios.get<IAlbum[]>(`/api/getAllAlbums?idUser=${idUser}`)
        return data
    },
    async getPhotoById(id: string){
        const { data } = await axios.get<IImagesId[]>(`/api/getPhotoByAlbum/${id}`)
        return data
    },
    async getFeelById(id: string){
        const { data } = await axios.get<IImagesId[]>(`/api/getFeed/${id}`)
        return data
    },
}