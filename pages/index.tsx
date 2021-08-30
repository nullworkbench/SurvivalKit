import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Icon from "@/components/Icon";

type Props = {
  items: number;
};

export async function getStaticProps() {
  const items: number = 44;
  return { props: { items } };
}

const Home: NextPage<Props> = ({ items }: Props) => {
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

      <main className={`pt-20 min-h-screen text-center`}>
        <section>
          <h1 className={`text-6xl font-bold `}>Survival Kit</h1>
          <p className={`mt-3`}>最低限必要な防災グッズを計算するツール</p>
        </section>

        <section className={`mt-10`}>
          <input
            type="number"
            placeholder="同居人数を入力"
            className={`block mx-auto border-solid border-2 border-gray-500 rounded-lg p-2`}
          />
          <p>{items}</p>
          <Icon type="WaterIcon" size={24} fill="#333" />
        </section>
      </main>

      <footer className={`p-5 text-center`}>
        <p>
          アイコンは
          <a
            href="https://soco-st.com"
            target="_blank"
            rel="noreferrer"
            className={`text-blue-500`}
          >
            ソコスト
          </a>
          からお借りしています。
        </p>
      </footer>
    </div>
  );
};

export default Home;
