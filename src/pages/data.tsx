import styles from "@/styles/Home.module.css";
import Logo from "../../public/assets/home/logo.png";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";

export default function Data() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    let allData: any = await localStorage.getItem("stockData");
    if (allData) {
      allData = JSON.parse(allData);
      setData(allData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className={`${styles.sideMenu} ${openMenu ? styles.opened : ""}`}>
        <div className={styles.close} onClick={() => setOpenMenu(!openMenu)}>
          close(x)
        </div>
        <div className={styles.menu} onClick={() => router.push("/")}>
          Home
        </div>
        <div className={styles.menu} onClick={() => router.push("/data")}>
          Data
        </div>
      </div>
      <div className={styles.mainWrapper}>
        <div className={styles.topWrapper}>
          <h1>PT. GLORIA SATYAKENCANA</h1>
          <div className={styles.imageWrapper}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src={Logo}
              alt="logo"
            />
          </div>
          <div
            className={styles.hamburger}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div className={styles.hamburgerSlice}></div>
            <div className={styles.hamburgerSlice}></div>
            <div className={styles.hamburgerSlice}></div>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <div style={{ overflow: "auto" }}>
            <table className={styles.tableStocks}>
              <tr>
                <th>No</th>
                <th>TGL</th>
                <th>Code</th>
                <th>In</th>
                <th>Out</th>
                <th>Balance</th>
                <th>Project</th>
                <th>Actions</th>
              </tr>
              {data && data?.length > 0 ? (
                <>
                  {data?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{moment(item.date).format("YYYY/MM/DD")}</td>
                        <td>{item.code}</td>
                        <td>{item.in}</td>
                        <td>{item.out}</td>
                        <td>-</td>
                        <td>{item.project}</td>
                        <td>
                          <div className={styles.edit}>Edit</div>
                          <div className={styles.delete}>Delete</div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td colSpan={8}>Data belum tersedia</td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
