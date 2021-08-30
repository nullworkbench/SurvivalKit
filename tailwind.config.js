module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], // build時に使用していないTailwindCSSを消す
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        jp: [
          "-apple-system",
          "BlinkMacSystemFont",
          "ヒラギノ角ゴシック",
          "Hiragino Sans",
          "YuGothic",
          "Yu Gothic",
          "Source Sans Pro",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        code: ["Courier New", "Courier", "monospace"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
