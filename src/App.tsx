/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Collapse, Input, type CollapseProps } from "antd";
import { useMemo, useState } from "react";
import CustomCollapseHeader from "./components/CustomCollapseHeader";
import RepoCardList from "./components/RepoCardList";
import getIsRepoAlreadyFetched from "./helpers/getIsRepoAlreadyFetched";
import useFetchDataRepo from "./hooks/useFetchDataRepo";
import useFetchDataUser from "./hooks/useFetchDataUsers";
import useNotification from "./hooks/useNotification";

function App() {
  const [activeAccordionKey, setActiveAccordionKey] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [activeSearchValue, setActiveSearchValue] = useState<string>("");

  const [dataUsers, isLoadingUsers, fetchDataUsers, setDataUsers] =
    useFetchDataUser();
  const [dataReposView, isLoadingRepo, fetchDataRepo, setDataReposView] =
    useFetchDataRepo();
  const [notificationContextProvider, pushNotification] = useNotification();

  const items: CollapseProps["items"] = useMemo(() => {
    return dataUsers?.map((v) => {
      const repoList = dataReposView.find(
        (repoView) => repoView.id === v.login
      )?.repo;
      return {
        key: v.login,
        label: (
          <CustomCollapseHeader
            isActive={v.login === activeAccordionKey[0]}
            title={v.login}
          />
        ),
        children: (
          <RepoCardList data={repoList || []} loading={isLoadingRepo} />
        ),
        showArrow: false,
      };
    });
  }, [dataUsers, dataReposView, activeAccordionKey, isLoadingRepo]);

  const handleErrorFetcher = (errorMsg: string) => {
    pushNotification("error", errorMsg);
    setDataUsers([]);
  };

  const handleClickSearch = () => {
    setDataReposView([]);
    setActiveSearchValue(searchValue);
    fetchDataUsers(searchValue, handleErrorFetcher);
  };

  const handleChangeCollapse = (key: string[]) => {
    setActiveAccordionKey(key);
    const idUser = key[0] || "";
    const isEmptyId = idUser === "";
    const isRepoAlreadyFetched = getIsRepoAlreadyFetched(dataReposView, idUser);

    if (isEmptyId || isRepoAlreadyFetched) return;
    fetchDataRepo(idUser, handleErrorFetcher);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {notificationContextProvider}
      <Card style={{ width: "600px", minWidth: "400px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleClickSearch()}
            placeholder="Search Github Users"
          />
          <Button
            disabled={isLoadingUsers}
            loading={isLoadingUsers}
            type="primary"
            onClick={handleClickSearch}
          >
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
