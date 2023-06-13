import React, {useEffect, useState} from 'react';
import styles from './FeedbackAdmin.module.scss';
import * as Api from "@/pages/api";
import Image from 'next/image'
const FeedbackAdmin = () => {
    const [report, setReport] = useState([])
    const getAllReports = async () => {
        let info = await Api.files.getAllReport()
        setReport(info)
    }
    useEffect(() => {
        getAllReports()
    }, [])
    const reports = [
        'Спам',
        'Запрещенный товар',
        'Обман',
        'Насилие и вражда',
        'Откровенное изображение'
    ]
    const handleReportText = (numberArray) => {
        let arr = []
        for (let i = 0; i < numberArray.length; i++) {
            const index = parseInt(numberArray[i]);
            arr.push(reports[index]);
        }
        return arr
    };
    const deletePhoto = async (idAlbum, idPhoto) => {
        const arr = report.filter(id => id.idPhoto !== idPhoto);
        setReport(arr)
        await Api.files.deletePhoto(idAlbum, idPhoto)
    }
    const deleteReport = async (idPhoto) => {
        const arr = report.filter(id => id.idPhoto !== idPhoto);
        setReport(arr)
        await Api.files.deleteReport(idPhoto)
    }
    return (
        <div>
            {report.length > 0 ? (report.map((rep) =>(
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>id пользователя</th>
                        <th>Фотография</th>
                        <th>id альбома</th>
                        <th>Причина</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                     <tbody>
                            <tr key={rep.idAlbum}>
                                <td>{rep.idUser}</td>
                                <td align="center">
                                    <div className={styles.photo_wrapper}>
                                        <Image className={styles.image}
                                               fill={true} src={`http://188.212.124.120:3001/api/download/${rep.idPhoto}`}
                                               alt={'Photo'}/>
                                    </div>
                                </td>
                                <td>{ rep.idAlbum }</td>
                                <td align="center">
                                    {
                                        handleReportText(rep.indexReport.split(",")).map(rep => (
                                                <p>{rep}</p>
                                            )
                                        )
                                    }
                                </td>
                                <td align="center">
                                            <button className={styles.delete_btn}
                                                    onClick={() => deletePhoto(rep.idAlbum, rep.idPhoto)}
                                            >
                                                <img width={30} height={30} src="/checked2.svg" alt="Delete"/>
                                            </button>
                                            <button className={styles.delete_btn}
                                                    onClick={() => deleteReport(rep.idPhoto)}
                                            >
                                                <img width={30} height={30} src="/redImages/close.svg" alt="Delete"/>
                                            </button>
                                </td>
                            </tr>
                    </tbody>
                    </table>
                    ))) :
                    <h2 className={styles.zero_vacancy}>Нет жалоб</h2>
                }
        </div>
    );
};

export default FeedbackAdmin;