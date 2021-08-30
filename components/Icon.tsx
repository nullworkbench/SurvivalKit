import styled from "styled-components";
// svg（babelのプラグインは絶対パスが使用できないので相対パスで）
import WaterIcon from "../data/icons/WaterIcon.svg";

export const IconType = {
  WaterIcon,
};

interface IconProps {
  type: keyof typeof IconType;
  size?: number;
  maxHeight: number;
  fill?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { type, size, maxHeight, fill } = props;
  const IconSvgFile = IconType[type];

  return (
    <IconSvgFile
      style={{
        width: size ? size + "px" : "100%",
        maxHeight: maxHeight ? maxHeight + "px" : "none",
        fill: fill ? fill : "",
      }}
    />
  );
};

export default Icon;

// 参考：Reactで最低限のSVGアイコンコンポーネントを作る（https://ryokatsu.dev/blog/2021/0827/）
