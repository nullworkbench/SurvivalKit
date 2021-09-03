import styled from "styled-components";
// svg（babelのプラグインは絶対パスが使用できないので相対パスで）
import AlphaRice from "../data/icons/AlphaRice.svg";
import Flashlight from "../data/icons/Flashlight.svg";
import Groves from "../data/icons/Groves.svg";
import MedicalKit from "../data/icons/MedicalKit.svg";
import MobileBattery from "../data/icons/MobileBattery.svg";
import Radio from "../data/icons/Radio.svg";
import ToiletPaper from "../data/icons/ToiletPaper.svg";
import Water from "../data/icons/Water.svg";

export const IconType = {
  AlphaRice,
  Flashlight,
  Groves,
  MedicalKit,
  MobileBattery,
  Radio,
  ToiletPaper,
  Water,
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
