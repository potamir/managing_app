import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Logo from "../../public/assets/home/logo.png";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const defaultData = {
    date: "",
    code: "",
    in: "",
    out: "",
    project: "",
  };
  const [data, setData] = useState({ ...defaultData });
  const [openMenu, setOpenMenu] = useState(false);

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const newData: any = { ...data };
    newData[name] = value;
    setData(newData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let allData: any = await localStorage.getItem("stockData");
    if (allData) {
      allData = JSON.parse(allData);
      allData.push(data);
      localStorage.stockData = JSON.stringify(allData);
    } else {
      localStorage.stockData = JSON.stringify([data]);
    }
    setData(defaultData);
  };

  return (
    <>
      <main>
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
            <div className={styles.formInputWrapper}>
              <h3>Stock Barang</h3>
              <form>
                <div className={styles.item}>
                  <span>Tanggal</span>
                  <input
                    name="date"
                    value={data.date}
                    onChange={onChangeHandler}
                    type="date"
                  />
                </div>
                <div className={styles.item}>
                  <span>Code</span>
                  <input
                    name="code"
                    value={data.code}
                    onChange={onChangeHandler}
                    type="text"
                  />
                </div>
                <div className={styles.item}>
                  <span>In</span>
                  <input
                    name="in"
                    value={data.in}
                    onChange={onChangeHandler}
                    type="number"
                  />
                </div>
                <div className={styles.item}>
                  <span>Out</span>
                  <input
                    name="out"
                    value={data.out}
                    onChange={onChangeHandler}
                    type="number"
                  />
                </div>
                <div className={styles.item}>
                  <span>Project</span>
                  <input
                    name="project"
                    value={data.project}
                    onChange={onChangeHandler}
                    type="text"
                  />
                </div>
                <div className={styles.buttonWrapper}>
                  <button onClick={handleSubmit}>Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
