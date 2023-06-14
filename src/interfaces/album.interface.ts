export interface IAlbum {
    id: string
    title: string
    frame: number
    idLogo: string
}
export interface IImagesId {
    idPhoto: string
    caption: string
}
export interface ILikes {
    idUser: string
    idAlbum: string
    idPhoto: string
    timestamp: string
}
export interface IAlbumData {
    albums: IAlbum[]
}
export interface IPhotoDataSingle {
    album: IImagesId
}
export interface IAlbumDataSingle {
    album: IAlbum
}
export interface IAlbumInfo {
    idAlbum: string
    idCreator: string
    title: string
    frame: number
    idImages: string
    idLogo: string
    idUsers: string
}
export interface IPhoto {
    path: string
    lastModified: number
    name: string
    size: number
    type: string
    webkitRelativePath: string
}