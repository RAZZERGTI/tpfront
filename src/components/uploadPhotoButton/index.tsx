import React from "react";
import styles from "./UploadPhotoButton.module.scss";
import { Button, Upload, UploadFile, notification } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

import * as Api from "../../pages/api"
import {useRouter} from "next/router";
import {checkAuth} from "@/utils/checkAuth";
import {GetServerSidePropsContext} from "next";
import nookies from "nookies";

export const UploadPhotoButton: React.FC = ({albumName}: string, ctx: GetServerSidePropsContext) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const router = useRouter();
  const onUploadSuccess = async (options) => {
    try {
      const { _id } = nookies.get(ctx);
      const file = await Api.files.uploadFile(options, albumName, _id)
      setFileList([]);
      window.location.reload();
    } catch (err) {
      notification.error({
        message: "Ошибка!",
        description: "Не удалось загрузить файл",
        duration: 2,
      });
    }
  };

  return (
    <Upload
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
      className={styles.upload}
    >
      <Button type="primary" className={styles.btn} icon={<CloudUploadOutlined />} size="large">
        Загрузить фото
      </Button>
    </Upload>
  );
};
