import styled from "styled-components";
// svg（babelのプラグインは絶対パスが使用できないので相対パスで）
import WaterIcon from "../data/icons/WaterIcon.svg";

export const IconType = {
  WaterIcon,
};

interface IconProps {
  type: keyof typeof IconType;
  size?: number;
  fill?: string;
}

const IconWrapper = styled.div<{ size?: number; fill?: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  fill: ${({ fill }) => (fill ? fill : "")};
`;

const Icon: React.FC<IconProps> = (props) => {
  const { type, size, fill } = props;
  const IconSvgFile = IconType[type];

  return (
    <IconWrapper size={size} fill={fill}>
      <WaterIcon />
    </IconWrapper>
  );
};

export default Icon;

// 参考：Reactで最低限のSVGアイコンコンポーネントを作る（https://ryokatsu.dev/blog/2021/0827/）
