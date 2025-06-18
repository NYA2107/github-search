import { DownOutlined, UpOutlined } from "@ant-design/icons";
import type { FC } from "react";

interface CustomCollapseHeaderPropsType {
  isActive: boolean;
  title: string;
}

const CustomCollapseHeader: FC<CustomCollapseHeaderPropsType> = (props) => {
  const { isActive, title } = props;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "1em",
      }}
    >
      <p
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        {title}
      </p>

      {isActive ? <UpOutlined /> : <DownOutlined />}
    </div>
  );
};

export default CustomCollapseHeader;
