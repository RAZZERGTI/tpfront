import { GetServerSidePropsContext, NextPage } from "next";
import { User } from "@/pages/api/dto/auth.dto";
import styles from "@/styles/Profile.module.scss";
import { checkAuth } from "@/utils/checkAuth";
import * as Api from "@/pages/api";
import React, {useEffect, useState} from "react";
import { Layout } from "@/layouts/Layout";
import nookies from "nookies";
import Logo from "@/components/profile/Logo";
import Link from "next/link";
import {AlbumService} from "@/services/album.service";

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPage<Props> = ({ userData }) => {
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      Api.auth.logout();
      location.href = "/";
    }
  };
  console.log(userData)
  const [albums, setAlbums] = useState([])
  const getAllAlbums = async () => {
    const albums = await AlbumService.getAllAlbums(String(userData.id))
    setAlbums(albums)
    console.log(albums)
  }
  useEffect(() => {
    getAllAlbums()
  }, [])
  return (
      <div className={styles.albums}>
        { albums.length ? (albums.map(album => (
            <div className={styles.item}>
              <div className={styles.item_left}>
                <Logo idLogo={album.idLogo}/>
                <div className={styles.information_item}>
                  <h3 className={styles.header}>{album.title}</h3>
                </div>
              </div>
              <div>
                <a className={styles.btn}
                        href={`http://188.212.124.120:3001/api/downloadZip/${album.id}`}
                        target={'_blank'}
                >
                    Скачать
                </a>
              </div>
            </div>
        ))) : <p>Нет альбомов</p>}
      </div>
    // <main>
    //   <div className={styles.root}>
    //     <h1>Мой профиль</h1>
    //     <br />
    //     <p>
    //       ID: <b>{userData.id}</b>
    //     </p>
    //     <p>
    //       Полное имя: <b>{userData.name}</b>
    //     </p>
    //     <p>
    //       E-Mail: <b>{userData.mail}</b>
    //     </p>
    //     <br />
    //     <Button onClick={onClickLogout} type="primary" danger>
    //       Выйти
    //     </Button>
    //   </div>
    // </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Профиль">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }
  const { _id } = nookies.get(ctx);

  const userData = await Api.auth.getMe(_id);

  return {
    props: {
      userData,
    },
  };
};

export default DashboardProfilePage;
