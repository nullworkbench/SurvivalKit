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
import BabyBottle from "../data/icons/BabyBottle.svg";
import Blanket from "../data/icons/Blanket.svg";
import ColoredGarbageBag from "../data/icons/ColoredGarbageBag.svg";
import Cubemilk from "../data/icons/Cubemilk.svg";
import Denture from "../data/icons/Denture.svg";
import MedicineHandbook from "../data/icons/MedicineHandbook.svg";
import Medicines from "../data/icons/Medicines.svg";
import Nappy from "../data/icons/Nappy.svg";
import SanitaryItem from "../data/icons/SanitaryItem.svg";
import WhistleBuzzer from "../data/icons/WhistleBuzzer.svg";

export const IconType = {
  AlphaRice,
  Flashlight,
  Groves,
  MedicalKit,
  MobileBattery,
  Radio,
  ToiletPaper,
  Water,
  BabyBottle,
  Blanket,
  ColoredGarbageBag,
  Cubemilk,
  Denture,
  MedicineHandbook,
  Medicines,
  Nappy,
  SanitaryItem,
  WhistleBuzzer,
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
