import React from "react";
import styles from "./UploadLogoButton.module.scss";
import { Button, Upload, UploadFile, notification } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

import * as Api from "../../pages/api"
import {useRouter} from "next/router";
import {checkAuth} from "@/utils/checkAuth";
import {GetServerSidePropsContext} from "next";
import nookies from "nookies";

export const UploadLogoButton: React.FC = ({setFileList}: string, ctx: GetServerSidePropsContext) => {
  const router = useRouter();


  return (
    <Upload
      fileList={setFileList}
      onChange={({ fileList }) => setFileList(fileList)}
      className={styles.upload}
    >
      <Button type="primary" className={styles.btn} icon={<CloudUploadOutlined />} size="large">
        Загрузить логотип
      </Button>
    </Upload>
  );
};
