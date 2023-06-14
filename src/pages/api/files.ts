import axios from "axios";
import {IAlbumInfo, IPhoto} from "@/interfaces/album.interface";
import React, {FC} from "react";
import {UploadFile} from "antd";

export const getInfoAboutAlbumById = async (idAlbum: string | string[] | undefined): Promise<IAlbumInfo> => {
  try {
    return (await axios.get(`http://188.212.124.120:3001/api/getInfoAlbumById/${idAlbum}`)).data;
  } catch (err) {
    console.log(err)
  }
};
export const getLikesById = async (idUser) => {
  try {
    return (await axios.get(`http://188.212.124.120:3001/api/like/${idUser}`)).data;
  } catch (err) {
    console.log(err)
  }
};
interface ISetPhotoCaption {
  idPhoto:any
  idUser:string
  idAlbum: any
  caption: string
}
export const setPhotoCaption = async (idPhoto: any, idUser: string, idAlbum: any, caption: string) =>{
  try {
    const data = {
    idPhoto: idPhoto,
    idUser: idUser,
    idAlbum: idAlbum,
    caption: caption,
  };
    return await axios.post('http://188.212.124.120:3001/api/photoCaption', data);
  } catch (err) {
    console.log(err)
  }
};
export const setLike = async(idPhoto: string, idAlbum : string, idUser: string ) =>{
  try {
    const data = {
      idUser: idUser,
      idAlbum: idAlbum,
      idPhoto: idPhoto,
    };
    return await axios.post(`http://188.212.124.120:3001/api/like`,data);
  } catch (err) {
    console.log(err)
  }
};
export const sendReport = async(idPhoto: string, idAlbum : string, idUser: string, indexReport: number[] ) =>{
  try {
    const data = {
      idPhoto: idPhoto,
      idUser: idUser,
      idAlbum: idAlbum,
      indexReport: indexReport,
    };
    return await axios.post(`http://188.212.124.120:3001/api/sendReport`,data);
  } catch (err) {
    console.log(err)
  }
};
export const deletePhoto= async(idAlbum : string, idPhoto: string) =>{
  try {
    return await axios.delete(`http://188.212.124.120:3001/api/delete/photo/${idAlbum}/${idPhoto}`);
  } catch (err) {
    console.log(err)
  }
};

export const deleteLike= async(idPhoto: string) =>{
  try {
    return await axios.delete(`http://188.212.124.120:3001/api/like/${idPhoto}`);
  } catch (err) {
    console.log(err)
  }
};
export const deleteReport= async(idPhoto: string) =>{
  try {
    return await axios.delete(`http://188.212.124.120:3001/api/deleteReport/${idPhoto}`);
  } catch (err) {
    console.log(err)
  }
};
export const getAllReport = async() =>{
  try {
    return (await axios.get(`http://188.212.124.120:3001/api/getAllReports`)).data;
  } catch (err) {
    console.log(err)
  }
};
export const uploadPhoto = async(fileUpload, idAlbum : string, idUser: string, caption: string) =>{
  console.log(fileUpload, idAlbum , idUser, caption)
  const formData = new FormData();
  formData.append('fromName', 'uploadPhoto')
  formData.append("imageUploads", fileUpload);
  formData.append('idAlbum', idAlbum)
  formData.append('idUser', idUser)
  formData.append('caption', caption)
  try {
    return await axios.post('http://188.212.124.120:3001/api/uploadPhoto', formData);
  } catch (err) {
    console.log(err)
  }
};
export const upload = async(fileUpload,idAlbum, idUser, caption, waterMark, shapes, color, frameBorder) =>{
  const rectangles = [];
  const circles = [];
  shapes.forEach(shape => {
    if (shape.type === 'rectangle') {
      rectangles.push(shape.position);
    } else if (shape.type === 'circle') {
      circles.push(shape.position);
    }
  });
  const formData = new FormData();
  // formData.append('fromName', 'uploadPhoto')
  formData.append("photo", fileUpload);
  formData.append("idAlbum", idAlbum);
  formData.append("idUser", idUser);
  formData.append("caption", caption);
  formData.append("circles", JSON.stringify(circles));
  formData.append("border", frameBorder);
  formData.append("color", color);
  formData.append("rectangles", JSON.stringify(rectangles));
  formData.append("waterMark", waterMark);
  try {
    const response = await axios.post('http://188.212.124.120:3001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data
  } catch (err) {
    console.log(err)
  }
};
export const uploadVideo= async(fileUpload, idAlbum : string, idUser: string, caption: string) =>{
  console.log(fileUpload, idAlbum , idUser, caption)
  const formData = new FormData();
  formData.append("imageUploads", fileUpload);
  try {
    return await axios.post('http://localhost:3001/api/uploadVideo', formData);
  } catch (err) {
    console.log(err)
  }
}
export const createAlbum = async (file, title: string, id: string, frame: string) => {
  console.log(file)
  const formData = new FormData();
  formData.append('fromName', 'AlbumImage')
  formData.append("imageUploads", file);
  formData.append('AlbumName', title)
  formData.append('frame', frame)
  formData.append('idUser', id)
  try {
    const response = await axios.post('http://188.212.124.120:3001/api/createAlbum', formData)
    console.log(response)
    return response;
  } catch (err) {
    console.log(err)
  }
};
