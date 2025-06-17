/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined, StarFilled, UpOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Input, Spin, type CollapseProps } from "antd";
import { useState } from "react";
import getUserRepos from "./fetchers/getUserRepos";
import getUsers from "./fetchers/getUsers";
import type { RepoViewType, UserDataType } from "./types";

function App() {
  const [activeAccordionKey, setActiveAccordionKey] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [activeSearchValue, setActiveSearchValue] = useState<string>("");
  const [dataUsers, setDataUsers] = useState<UserDataType[]>([]);
  const [dataReposView, setDataReposView] = useState<RepoViewType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataUsers = (search?: string) => {
    setIsLoading(true);
    getUsers({ per_page: 5, q: search })
      .then((resp) => {
        setDataUsers(resp.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchDataRepo = (id: string) => {
    setIsLoading(true);
    getUserRepos(id, { per_page: -1, sort: "pushed" })
      .then((resp) => {
        const tempDataReposView: RepoViewType[] = JSON.parse(
          JSON.stringify(dataReposView)
        );
        tempDataReposView.push({
          id,
          repo: resp.data.map((v) => ({
            title: v.name,
            desription: v.description,
            star: v.stargazers_count,
          })),
        });
        setDataReposView(tempDataReposView);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const items: CollapseProps["items"] = dataUsers?.map((v) => {
    const repoList = dataReposView.find(
      (repoView) => repoView.id === v.login
    )?.repo;
    return {
      key: v.login,
      label: (
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
            {v.login}
          </p>

          {v.login === activeAccordionKey[0] ? (
            <UpOutlined />
          ) : (
            <DownOutlined />
          )}
        </div>
      ),
      children: (
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          {isLoading ? (
            <Spin />
          ) : (
            repoList?.map((repo) => {
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
      ),
      showArrow: false,
    };
  });

  const handleClickSearch = () => {
    setDataReposView([]);
    setActiveSearchValue(searchValue);
    fetchDataUsers(searchValue);
  };

  const handleChangeCollapse = (key: string[]) => {
    const idUser = key[0] || "";
    setActiveAccordionKey(key);
    if (idUser === "") return;
    const filterRepo = dataReposView.filter(
      (repoView) => repoView.id === idUser
    );
    const isRepoAlreadyFetched = filterRepo.length > 0;
    if (isRepoAlreadyFetched) return;
    fetchDataRepo(idUser);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "600px", minWidth: "400px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Github Users"
          />
          <Button type="primary" onClick={handleClickSearch}>
            Search
          </Button>
          <p>Showing users for "{activeSearchValue}"</p>
          <Collapse
            accordion
            onChange={handleChangeCollapse}
            activeKey={activeAccordionKey}
            items={items}
          />
        </div>
      </Card>
    </div>
  );
}

export default App;
