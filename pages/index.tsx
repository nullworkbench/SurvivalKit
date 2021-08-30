import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={`container mx-auto`}>
      <Head>
        <title>Survival Kit</title>
        <meta
          name="description"
          content="最低限必要な防災グッズを計算するツールです"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`pt-20`}>
        <section>
          <h1 className={`text-6xl font-bold text-center`}>Survival Kit</h1>
          <p className={`text-center mt-3`}>
            最低限必要な防災グッズを計算するツール
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
