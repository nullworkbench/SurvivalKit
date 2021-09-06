import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Icon from "@/components/Icon";
import ItemsJson from "@/data/items.json";

// 防災グッズ
type Item = {
  id: number;
  name: string;
  explanation: string;
  iconType: string;
};

type Props = {
  items: Item[];
};

// build時に一回だけ実行される
export async function getStaticProps() {
  // jsonから防災グッズの情報を取得する
  const items: Item[] = ItemsJson;
  return { props: { items } };
}

const Home: NextPage<Props> = ({ items }: Props) => {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Survival Kit</title>
        <meta
          name="description"
          content="最低限必要な防災グッズを計算するツールです"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-20 min-h-screen text-center">
        <section>
          <h1 className="text-6xl font-bold">Survival Kit</h1>
          <p className="mt-3">最低限必要な防災グッズを計算するツール</p>
        </section>

        <section className="mt-10">
          <input
            type="number"
            placeholder="同居人数を入力"
            className="block mx-auto border-solid border-2 border-gray-500 rounded-lg p-2"
          />
          <div className="flex">
            {items.map((item, idx) => {
              return (
                <div key={idx} className="w-3/12">
                  <Icon type={item.iconType} maxHeight={100} />
                  <span className="block text-2xl">{item.name}</span>
                  <p>{item.explanation}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="p-5 text-center">
        <p>
          アイコンは
          <a
            href="https://soco-st.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
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
