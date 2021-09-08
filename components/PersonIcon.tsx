import Icon from "@/components/Icon";
import { UserCircleIcon } from "@heroicons/react/solid";

// 人物アイコン設定

type Props = { age: number; gender: Gender };

const PersonIcon: React.FC<Props> = ({ age, gender }) => {
  function renderPersonIcon(): JSX.Element {
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
        return (
          <UserCircleIcon
            className="fill-current text-yellow-300"
            style={{ width: "128%", marginLeft: "-14%", marginTop: "-14%" }}
          />
        );
        break;
    }
  }

  return (
    <div
      className="relative w-full mx-auto border-8 border-yellow-300 rounded-full overflow-hidden"
      style={{ maxWidth: "10rem", minWidth: "5rem" }}
    >
      <div style={{ paddingBottom: "100%" }}>
        <div className="absolute top-0 left-0 w-full">{renderPersonIcon()}</div>
      </div>
    </div>
  );
};

export default PersonIcon;
