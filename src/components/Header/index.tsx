import React, {useEffect, useState} from "react";
import { Layout, Avatar, Menu, Popover, Button } from "antd";
import styles from "./Header.module.scss";
import { CloudOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import * as Api from "@/pages/api";
import Link from "next/link";
import nookies from "nookies";
import {GetServerSidePropsContext} from "next";

export const Header: React.FC = (ctx: GetServerSidePropsContext) => {
  const router = useRouter();
  const selectedMenu = router.pathname;
  const { _id } = nookies.get(ctx);
  const [user, setUser] = useState({})
  console.log(user)
  const getInfos = async () => {
    const userData = await Api.auth.getMe(_id);
    setUser(userData)
  }
  useEffect(()=>{
    getInfos()
  }, [_id])

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      Api.auth.logout();
      location.href = "/dashboard/auth";
    }
  };

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <Link href='/dashboard'>
          <h2>
            <CloudOutlined />
            TaP
          </h2>
        </Link>

        <div className={styles.headerRight}>
          <Popover
            trigger="hover"
            content={
            <>
              <p>Никнейм: {user.name}</p>
              <p style={{marginBottom: 10}}>Почта: {user.mail}</p>
              <Button onClick={onClickLogout} type="primary" danger>
                Выйти
              </Button>
            </>
            }
          >
            <Link href={'/dashboard/profile'}>
              <Avatar>A</Avatar>
            </Link>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  );
};
