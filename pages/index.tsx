import type { NextPage } from "next";
import Head from "next/head";
import Icon from "@/components/Icon";
import ItemsJson from "@/data/items.json";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useState,
} from "react";

// heroicons
import { UserCircleIcon } from "@heroicons/react/solid";

// 防災グッズ
type Item = {
  id: number;
  name: string;
  unit: { num: number; name: string };
  explanation: string;
  iconType: string;
};
// 防災グッズ
type ItemQuantity = {
  itemId: number;
  quantity: number;
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
  const [persons, setPersons] = useState<Person[]>([]);

  // バックパックの初期値（全てのアイテムが０個）
  const initialBackpackContent: ItemQuantity[] = items.map((item) => {
    return { itemId: item.id, quantity: 0 };
  });
  // バックパック（計算結果）
  const [backpack, setBackpack] = useState<ItemQuantity[]>(
    initialBackpackContent
  );

  // 計算ボタンを押したとき
  function calculateBackpack() {
    // 新しいbackpack
    const _new = initialBackpackContent;

    // アイテムを追加する関数
    function addItems(array: ItemQuantity[]) {
      array.map((request) => {
        const target = _new.find((v) => v.itemId == request.itemId)!;
        target.quantity += request.quantity;
      });
    }

    // 世帯人数によって数が決まるアイテム
    const numOfPersons = persons.length; // 世帯人数
    const numOfDays = 3; // 備える日数
    const required: ItemQuantity[] = [
      { itemId: 0, quantity: 3 * numOfDays * numOfPersons }, // 飲料水（1人3L*日数）
      { itemId: 2, quantity: Math.round(numOfPersons / 2) }, // 懐中電灯
      { itemId: 3, quantity: numOfPersons }, // 軍手（人数分）
      { itemId: 4, quantity: 1 }, // 応急キット
      { itemId: 6, quantity: 1 }, // ラジオ
      { itemId: 7, quantity: 1 * numOfDays * numOfPersons }, // トイレットペーパー（日数*人数）
      { itemId: 9, quantity: numOfPersons }, // 毛布（人数分）
    ];
    addItems(required);

    persons.map((person) => {
      switch (true) {
        case person.age > 12: {
          const requests: ItemQuantity[] = [
            { itemId: 1, quantity: 9 },
            { itemId: 5, quantity: 1 },
          ];
          addItems(requests);
          break;
        }
        default:
          break;
      }
    });

    // backpack更新
    setBackpack([..._new]);
  }

  // Form
  // FormData
  type FormData = {
    name: string;
    gender: "man" | "woman";
    age: number;
  };
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "man",
    age: 0,
  });
  // 人物アイコン設定
  function renderPersonIcon(): JSX.Element {
    const age = formData.age;
    const gender = formData.gender;

    const icon = (n: number) => {
      return gender == "man" ? (
        <Icon type={`Man${n}`} />
      ) : (
        <Icon type={`Woman${n}`} />
      );
    };

    switch (true) {
      case age < 3 && age >= 0:
        return <Icon type="Baby" />;
        break;
      case age >= 3 && age < 10:
        return icon(3);
        break;
      case age >= 10 && age < 20:
        return icon(10);
        break;
      case age >= 20 && age < 40:
        return icon(20);
        break;
      case age >= 40 && age < 60:
        return icon(40);
        break;
      case age >= 60:
        return icon(60);
        break;
      default:
        return <UserCircleIcon className="fill-current text-gray-500" />;
        break;
    }
  }
  // フォームの内容を変更したとき
  function hundleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const _new = { ...formData };
    const val = event.target.value;
    switch (event.target.name) {
      case "name":
        _new.name = val;
        break;
      case "gender":
        _new.gender = val == "man" ? "man" : "woman";
        break;
      case "age":
        _new.age = val ? Number(val) : -1;
        break;
      default:
        break;
    }
    setFormData(_new);
  }
  // 追加ボタンを押したとき
  function addPersonBtn() {}

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

      <main className="pt-20 px-8 min-h-screen text-center">
        <section>
          <h1 className="text-6xl font-bold">Survival Kit</h1>
          <p className="mt-3">最低限必要な防災グッズを計算するツール</p>
        </section>

        <section className="mt-10">
          <div className=" border-black border-2 mb-2 p-8">
            {/* アイコン */}
            <div className="relative w-1/2 mx-auto border-8 border-yellow-300 rounded-full  overflow-hidden">
              <div style={{ paddingBottom: "100%" }}>
                <div className="absolute top-0 left-0 w-full">
                  {renderPersonIcon()}
                </div>
              </div>
            </div>
            {/* 名前 */}
            <div>
              <input
                type="text"
                id={`inputArea1`}
                name="name"
                placeholder="名前を入力（省略可）"
                className="bg-transparent focus:outline-none"
                onChange={(e) => hundleInputChange(e)}
              />
              <span>さん</span>
            </div>

            <div className="flex justify-center pb-4">
              <label htmlFor={`inputArea2`} className="p-2 mr-4">
                性別
              </label>
              <select
                id={`inputArea2`}
                name="gender"
                className="block border-solid border-2 border-gray-500 rounded-lg p-2"
                onChange={(e) => hundleInputChange(e)}
              >
                <option value="man">男性</option>
                <option value="woman">女性</option>
              </select>
            </div>
            <div className="flex justify-center pb-4">
              <label htmlFor={`inputArea3`} className="p-2 mr-4">
                年齢
              </label>
              <input
                type="number"
                id={`inputArea3`}
                name="age"
                placeholder="年齢を入力"
                className="block border-solid border-2 border-gray-500 rounded-lg p-2"
                onChange={(e) => hundleInputChange(e)}
              />
            </div>

            <button onClick={() => addPersonBtn()}>追加</button>
          </div>

          <h3>世帯人数：{persons.length}</h3>
          <div className="flex flex-wrap justify-center">
            {/* 世帯人数の数だけ繰り返す */}
            {persons.map((person, idx) => {})}
          </div>

          {/* 計算する */}
          <div>
            <button onClick={() => calculateBackpack()}>計算する</button>
          </div>

          {/* 人を追加する */}
          <div className="mt-4">
            <button
              className="text-white font-semibold bg-blue-400 px-8 py-3 rounded-lg"
              onClick={() => setPersons([...persons, new Person("", "man", 0)])}
            >
              家族を追加
            </button>
          </div>
        </section>

        {/* 計算結果 */}
        <section>
          <h2 className="text-4xl font-semibold">Your Backpack</h2>
          <p>避難リュック、倉庫に備えておくべきもの</p>

          <table className="table-auto mx-auto w-full max-w-5xl">
            <thead>
              <tr>
                <th>アイテム</th>
                <th>単位</th>
                <th>数量</th>
                <th>合計</th>
              </tr>
            </thead>
            <tbody>
              {backpack.map((v, idx) => {
                // 0個のものは表示しない
                if (v.quantity == 0) return;

                const tdStyle = "border-2 border-black p-4";
                const item = items.find((j) => j.id == v.itemId)!;
                return (
                  <tr key={idx}>
                    {/* アイテム */}
                    <td className={tdStyle}>
                      <Icon type={item.iconType} maxHeight={100} />
                      <span>{item.name}</span>
                    </td>
                    {/* 単位 */}
                    <td
                      className={tdStyle}
                    >{`${item.unit.num} ${item.unit.name}`}</td>
                    {/* 数量 */}
                    <td className={tdStyle}>{v.quantity}</td>
                    {/* 合計 */}
                    <td className={tdStyle}>
                      <strong>
                        {`${item.unit.num * v.quantity} ${item.unit.name}`}
                      </strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section>
          <div className="flex">
            {items.map((item, idx) => {
              return (
                <div key={idx} className="w-3/12">
                  <Icon type={item.iconType} maxHeight={100} />
                  <span className="block text-2xl">{item.name}</span>
                  <span>{`${item.unit.num} ${item.unit.name}`}</span>
                  <p>{item.explanation}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="p-5 text-center">
        <p>
          このアプリは
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-500"
          >
            Next.js
          </a>
          、
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-500"
          >
            Tailwind CSS
          </a>
          を使って開発しています。
        </p>
        <p>
          一部のアイコンは
          <a
            href="https://heroicons.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-500"
          >
            heroicons
          </a>
          を利用しています。
        </p>
        <p>
          人物のイラストは
          <a
            href="https://soco-st.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-500"
          >
            ソコスト
          </a>
          を利用しています。
        </p>
        <p>
          防災グッズのイラストは全てAdobe Illustratorを用いて自作しています。
        </p>
      </footer>
    </div>
  );
};

export default Home;
