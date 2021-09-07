import styled from "styled-components";
// svg（babelのプラグインは絶対パスが使用できないので相対パスで）
// 防災グッズ
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
// 人物
import Baby from "../data/icons/soko-st/Baby.svg";
import Man3 from "../data/icons/soko-st/Man3.svg";
import Man10 from "../data/icons/soko-st/Man10.svg";
import Man20 from "../data/icons/soko-st/Man20.svg";
import Man40 from "../data/icons/soko-st/Man40.svg";
import Man60 from "../data/icons/soko-st/Man60.svg";
import Woman3 from "../data/icons/soko-st/Woman3.svg";
import Woman10 from "../data/icons/soko-st/Woman10.svg";
import Woman20 from "../data/icons/soko-st/Woman20.svg";
import Woman40 from "../data/icons/soko-st/Woman40.svg";
import Woman60 from "../data/icons/soko-st/Woman60.svg";

export const IconType = {
  // 防災グッズ
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
  // 人物
  Baby,
  Man3,
  Man10,
  Man20,
  Man40,
  Man60,
  Woman3,
  Woman10,
  Woman20,
  Woman40,
  Woman60,
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
