import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Icon from "@/components/Icon";
import ItemsJson from "@/data/items.json";
import React, { useState } from "react";

// 防災グッズ
type Item = {
  id: number;
  name: string;
  explanation: string;
  iconType: string;
};

// 人
type Gender = "man" | "woman";
class Person {
  name?: string;
  gender: Gender;
  age: number;

  constructor(name?: string, gender: Gender, age: number) {
    this.name = name;
    this.gender = gender;
    this.age = age;
  }
}

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
  // 入力項目
  const inputEntries = [
    { name: "名前", type: "text", placeholder: "名前を入力（省略可）" },
    { name: "年齢", type: "number", placeholder: "年齢を入力" },
  ];

  // 世帯人数
  const Taro = new Person("太郎", "man", 21);
  const [persons, setPersons] = useState<Person[]>([Taro]);

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
          {/* 世帯人数の数だけ繰り返す */}
          {persons.map((person, idx) => {
            const InputWrap = (props: {
              name: string;
              children: React.ReactNode;
            }) => {
              return (
                <div className="flex justify-center">
                  <label htmlFor={`inputArea${idx}`} className="p-2 mr-4">
                    {props.name}
                  </label>
                  {props.children}
                </div>
              );
            };

            const inputStyle =
              "block border-solid border-2 border-gray-500 rounded-lg p-2";
            return (
              <div key={idx}>
                <InputWrap name="名前">
                  <input
                    type="text"
                    id={`inputArea${idx}`}
                    placeholder="名前を入力（省略可）"
                    className={inputStyle}
                  />
                </InputWrap>
                <InputWrap name="性別">
                  <select
                    type="text"
                    id={`inputArea${idx}`}
                    placeholder="年齢を入力"
                    className={inputStyle}
                  >
                    <option value="man">男性</option>
                    <option value="woman">女性</option>
                  </select>
                </InputWrap>
                <InputWrap name="年齢">
                  <input
                    type="text"
                    id={`inputArea${idx}`}
                    placeholder="年齢を入力"
                    className={inputStyle}
                  />
                </InputWrap>
              </div>
            );
          })}

          {/* 人を追加する */}
          <div>
            <button
              className="text-white font-bold bg-blue-400 px-8 py-3 rounded-lg"
              onClick={() => setPersons([...persons, new Person("", "man", 0)])}
            >
              家族を追加
            </button>
          </div>
        </section>

        <section>
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
