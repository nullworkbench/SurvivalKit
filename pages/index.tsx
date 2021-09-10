import type { NextPage } from "next";
import Head from "next/head";
import AlertModal from "@/components/Modals/AlertModal";
import DetailModal from "@/components/Modals/DetailModal";
import Icon from "@/components/Icon";
import PersonIcon from "@/components/PersonIcon";
import ItemsJson from "@/data/items.json";
import { ChangeEvent, useState } from "react";

// heroicons
import { MinusCircleIcon } from "@heroicons/react/solid";

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
  // styled
  const h2style = "text-4xl font-semibold";

  // 詳細モーダルで表示したいitemId
  const [detailItemId, setDetailItemId] = useState<number>(0);

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

  // バックパックを計算
  function calculateBackpack(numOfPersons: number, newPersons: Person[]) {
    // 世帯人数が0になったら空にして早期return
    if (numOfPersons == 0) {
      setBackpack(initialBackpackContent);
      return;
    }

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
    const numOfDays = 3; // 備える日数
    const required: ItemQuantity[] = [
      { itemId: 0, quantity: 3 * numOfDays * numOfPersons }, // 飲料水（1人3L*日数）
      { itemId: 2, quantity: Math.round(numOfPersons / 2) }, // 懐中電灯
      { itemId: 3, quantity: numOfPersons }, // 軍手（人数分）
      { itemId: 4, quantity: 1 }, // 応急キット
      { itemId: 5, quantity: Math.round(numOfPersons / 2) }, // モバイルバッテリー
      { itemId: 6, quantity: 1 }, // ラジオ
      { itemId: 7, quantity: 1 * numOfDays * numOfPersons }, // トイレットペーパー（日数*人数）
      { itemId: 8, quantity: numOfPersons }, // 毛布（人数分）
    ];
    addItems(required);

    // 人によって変わるアイテム
    newPersons.map((person) => {
      // １歳以上の食料
      if (person.age >= 1) addItems([{ itemId: 1, quantity: 3 * numOfDays }]);

      const requests: ItemQuantity[] = [];
      switch (true) {
        // 赤ちゃん（１歳未満）
        case person.age <= 1: {
          requests.push({ itemId: 9, quantity: 7 * numOfDays }); // 使い捨て哺乳瓶
          requests.push({ itemId: 10, quantity: 4 * 7 * numOfDays }); // 粉ミルク
          requests.push({ itemId: 11, quantity: 10 * numOfDays }); // おむつ
          break;
        }
        // 幼児（４歳未満）
        case person.age < 4: {
          requests.push({ itemId: 11, quantity: 6 * numOfDays }); // おむつ
          break;
        }
        case person.gender == "woman" && person.age >= 10: {
          requests.push({ itemId: 12, quantity: numOfDays }); // 生理用品
          requests.push({ itemId: 13, quantity: 3 * numOfDays }); // 色付きゴミ袋
          requests.push({ itemId: 14, quantity: 1 }); // ホイッスル・防犯ブザー
          break;
        }
        case person.age >= 60: {
          requests.push({ itemId: 15, quantity: 1 }); // 入れ歯
          requests.push({ itemId: 16, quantity: 1 }); // お薬手帳
          requests.push({ itemId: 17, quantity: numOfDays }); // 持病の薬
          break;
        }
        default:
          break;
      }
      addItems(requests);
    });

    // backpack更新
    setBackpack([..._new]);
  }

  // Form
  // FormData
  type FormData = {
    name: string;
    gender: Gender;
    age: number;
  };
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "man",
    age: -1,
  });
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
  function addPersonBtn() {
    // 年齢が未入力の場合は早期return
    const ageInput = document.getElementById("inputArea2") as HTMLInputElement;
    if (!ageInput.value) {
      alert("年齢を入力してください");
      return;
    }
    // formDataからPersonを作成しpersonsに合併
    const p: Person = {
      name: formData.name,
      gender: formData.gender,
      age: formData.age,
    };
    setPersons([...persons, p]);
    // バックパック計算
    calculateBackpack(persons.length + 1, [...persons, p]);
    // フォームの入力内容をクリア
    setFormData({ name: "", gender: "man", age: -1 });
    ageInput.value = "";
  }

  // アイテムの詳細モーダル
  function openDetailModal(itemId: number) {
    setDetailItemId(itemId);
  }

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
        <section className="mb-16">
          <h1 className="text-6xl font-bold">Survival Kit</h1>
          <p className="mt-3">最低限必要な防災グッズを計算するツール</p>
        </section>

        <section className="mb-32">
          <h2 className="text-lg font-semibold mb-4">
            使い方は簡単３ステップ！
          </h2>
          <ol className="list-decimal text-left mx-auto w-max">
            <li>家族を登録</li>
            <li>自動で計算される防災グッズを確認する</li>
            <li>防災グッズを備えておく</li>
          </ol>
        </section>

        <section className="mb-20">
          <h2 className={`${h2style} mb-4`}>Family Members</h2>

          {/* メンバー一覧 */}
          <section className="mb-5">
            <h3 className="text-lg mb-3">
              世帯人数：
              <span className="text-2xl font-semibold">{persons.length}</span>
            </h3>
            <div className="flex flex-wrap justify-center">
              {/* 世帯人数の数だけ繰り返す */}
              {persons.map((person, idx) => {
                return (
                  <div key={idx} className="relative mx-5 mb-5">
                    <div className="w-24">
                      <PersonIcon age={person.age} gender={person.gender} />
                    </div>
                    <span className="block mt-2">
                      {person.name ? person.name : "名無しさん"} ({person.age})
                    </span>
                    <div
                      className="absolute -top-1.5 -right-3 w-1/3 cursor-pointer"
                      onClick={() => {
                        if (
                          !confirm(
                            `${person.name ? person.name : "名無しさん"} (${
                              person.age
                            }) をメンバー一覧から削除しますか？`
                          )
                        )
                          return;

                        setPersons((_current) => {
                          // 削除
                          const _new = [..._current];
                          _new.splice(idx, 1);
                          // バックパック再計算
                          calculateBackpack(_new.length, _new);
                          return _new;
                        });
                      }}
                    >
                      <MinusCircleIcon className="bg-white rounded-full fill-current text-red-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* メンバー追加 */}
          <div
            className="mx-auto border-black border-2 rounded-xl mb-2 p-8"
            style={{ maxWidth: "30rem" }}
          >
            <h3 className="text-2xl font-semibold mb-5">Add Member</h3>

            {/* アイコン */}
            <PersonIcon age={formData.age} gender={formData.gender} />

            {/* 名前 */}
            <div className="flex justify-center py-4">
              <input
                type="text"
                id="inputArea1"
                name="name"
                placeholder="名前を入力"
                // className="block w-max ml-6 text-center bg-transparent focus:outline-none"
                className="block text-center border-solid border-2 border-gray-500 rounded-lg outline-none p-2"
                value={formData.name}
                onChange={(e) => hundleInputChange(e)}
              />
              {/* <PencilAltIcon
                className="w-6 fill-current text-gray-500"
                onClick={() => document.getElementById("inputArea1")?.focus()}
              /> */}
            </div>
            {/* 性別 */}
            <div className="flex justify-center pb-4">
              <select
                name="gender"
                className="block border-solid border-2 border-gray-500 rounded-lg outline-none bg-white p-2"
                value={formData.gender}
                onChange={(e) => hundleInputChange(e)}
              >
                <option value="man">男性</option>
                <option value="woman">女性</option>
              </select>
            </div>
            {/* 年齢 */}
            <div className="flex justify-center pb-4">
              <input
                type="number"
                id="inputArea2"
                name="age"
                placeholder="年齢を入力"
                className="w-28 text-center border-solid border-2 border-gray-500 rounded-lg outline-none p-2"
                min={0}
                onChange={(e) => hundleInputChange(e)}
              />
              <span className="block py-2 pl-2">才</span>
            </div>

            <button
              className="w-full mt-6 text-white font-semibold bg-blue-400 px-12 py-3 rounded-lg"
              onClick={() => addPersonBtn()}
            >
              追加
            </button>
          </div>
        </section>

        {/* 計算結果 */}
        <section className="mb-20">
          <h2 className={h2style}>Your Backpack</h2>
          <p>避難リュック、倉庫に備えておくべきもの</p>

          <table className="table-auto mx-auto w-full max-w-5xl">
            <thead>
              <tr>
                <th>アイテム</th>
                {/* <th>単位</th> */}
                {/* <th>数量</th> */}
                <th>合計</th>
                <th>詳細</th>
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
                    <td className={`${tdStyle} flex-grow`}>
                      <Icon type={item.iconType} maxHeight={100} />
                      <span>{item.name}</span>
                    </td>
                    {/* 単位 */}
                    {/* <td
                      className={tdStyle}
                    >{`${item.unit.num} ${item.unit.name}`}</td> */}
                    {/* 数量 */}
                    {/* <td className={tdStyle}>{v.quantity}</td> */}
                    {/* 合計 */}
                    <td className={`${tdStyle} w-1/3`}>
                      <strong>
                        {`${item.unit.num * v.quantity} ${item.unit.name}`}
                      </strong>
                    </td>
                    {/* 詳細 */}
                    <td className={tdStyle}>
                      <DetailModal title={item.name}>
                        <div className="my-8">
                          <Icon type={item.iconType} maxHeight={200} />
                          <p className="mt-4">{item.explanation}</p>
                        </div>
                      </DetailModal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="my-32">
          <h2 className={`${h2style} mb-2`}>All of Survival Kit</h2>
          <p>Survival Kitに実装されている防災グッズ一覧</p>
          <p className="mb-8">
            計算されたBackpackの中身と合わせて、必要に応じて準備しましょう。
          </p>

          <div className="grid grid-cols-3 gap-8">
            {items.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 filter drop-shadow-lg"
                >
                  <Icon type={item.iconType} maxHeight={100} />
                  <span className="block text-2xl my-4">{item.name}</span>
                  <DetailModal title={item.name}>
                    <div className="my-8">
                      <Icon type={item.iconType} maxHeight={200} />
                      <span className="block mt-4">
                        単位：{`${item.unit.num} ${item.unit.name}`}
                      </span>
                      <p className="mt-2">{item.explanation}</p>
                    </div>
                  </DetailModal>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
