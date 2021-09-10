const GlobalFooter: React.FC = () => {
  return (
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
      {/* <p>
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
      </p> */}
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
      <p>防災グッズのイラストは全てAdobe Illustratorを用いて自作しています。</p>
      <p>
        必要な防災グッズは
        <a
          href="https://www.alsok.co.jp/person/recommend/1003/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-500"
        >
          ALSOK公式HP
        </a>
        を参考にしました。
      </p>
      <p className="my-8">
        &copy; 2021{" "}
        <a
          href="https://nullworkbench.github.io"
          target="_blank"
          rel="noreferrer"
        >
          nullworkbench
        </a>
      </p>
    </footer>
  );
};

export default GlobalFooter;
