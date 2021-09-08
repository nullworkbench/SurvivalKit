declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

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
type Person = {
  name?: string;
  gender: Gender;
  age: number;
};
