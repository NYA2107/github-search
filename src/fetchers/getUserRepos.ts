/* eslint-disable @typescript-eslint/no-explicit-any */
import { REPOSITORIES_URL, USERS_URL } from "../constants/url";
import api from "../helpers/api";
import type { ErrorApiType, RepoDataType } from "../types";

const getUserRepos = (id: string, params?: any) => {
  return new Promise<{ data: RepoDataType[] }>((resolve, reject) => {
    api
      .get([...USERS_URL, ...[id], ...REPOSITORIES_URL].join("/"), { params })
      .then((resp: { data: RepoDataType[] }) => {
        resolve({ data: resp.data });
      })
      .catch((err: ErrorApiType) => {
        reject(err.response.data.message);
      });
  });
};

export default getUserRepos;
