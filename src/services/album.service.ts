import axios from "axios";
import {IAlbum} from "@/interfaces/album.interface";
const API_URL = 'http://188.212.124.120:3001'

axios.defaults.baseURL = API_URL

export const AlbumService = {
    async getAllAlbums() {
        const { data } = await axios.get<IAlbum[]>('/getAllAlbums?idUser=123')
        return data
    }
}