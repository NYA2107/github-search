import { useState } from "react";
import getUserRepos from "../fetchers/getUserRepos";
import type { RepoViewType } from "../types";

type FetchDataRepoHooksType = () => [
  RepoViewType[],
  boolean,
  (id: string, errCallback?: (err: string) => void) => void,
  React.Dispatch<React.SetStateAction<RepoViewType[]>>
];

const useFetchDataRepo: FetchDataRepoHooksType = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataReposView, setDataReposView] = useState<RepoViewType[]>([]);

  const fetchDataRepo = (id: string, errCallback?: (err: string) => void) => {
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
      .catch((errMsg: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        errCallback && errCallback(errMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return [dataReposView, isLoading, fetchDataRepo, setDataReposView];
};

export default useFetchDataRepo;
