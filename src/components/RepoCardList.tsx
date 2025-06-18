import type { FC } from "react";
import type { RepoType } from "../types";
import { Card, Spin } from "antd";
import { StarFilled } from "@ant-design/icons";

interface RepoCardListPropsType {
  loading?: boolean;
  data: RepoType[];
}

const RepoCardList: FC<RepoCardListPropsType> = (props) => {
  const { data, loading } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      {loading ? (
        <Spin />
      ) : (
        data?.map((repo) => {
          return (
            <Card
              title={
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "1em",
                  }}
                >
                  <div>{repo.title}</div>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {repo.star}
                    <StarFilled />
                  </div>
                </div>
              }
            >
              <p>{repo.desription}</p>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default RepoCardList;
