export interface IAlbum {
    id: string
    title: string
    idLogo: string
}
export interface IAlbumData {
    albums: IAlbum[]
}
export interface IAlbumDataSingle {
    album: IAlbum
}