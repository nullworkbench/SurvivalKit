import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Survival Kit</title>
        <meta
          name="description"
          content="最低限必要な防災グッズを計算するツールです"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>
    </div>
  );
};

export default Home;
