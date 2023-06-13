import React from "react";
import styles from "@/styles/Home.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";


export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const selectedMenu = router.pathname;
    console.log(selectedMenu)
  return (
    <main className={styles.dashboardContainer}>
        {selectedMenu === '/dashboard' &&
          <Link href='./createAlbum' className={styles.btn_import}>
                  <div className={styles.import}>
                        <span>
                            <Image src='/plus.svg' className={styles.import_image} alt='search-icon' width={18} height={18} />
                            <p>Добавить</p>
                        </span>
                  </div>
          </Link>
        }
      {children}
    </main>
  );
};
