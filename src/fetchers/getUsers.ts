/* eslint-disable @typescript-eslint/no-explicit-any */
import { SEARCH_USERS_URL } from "../constants/url";
import api from "../helpers/api";
import type { ErrorApiType, UserDataType } from "../types";

const getUsers = (params?: any) => {
  return new Promise<{ data: UserDataType[]; total: number }>(
    (resolve, reject) => {
      api
        .get([...SEARCH_USERS_URL].join("/"), { params })
        .then(
          (resp: { data: { items: UserDataType[]; total_count: number } }) => {
            resolve({ data: resp.data.items, total: resp.data.total_count });
          }
        )
        .catch((err: ErrorApiType) => {
          reject(err.response.data.message);
        });
    }
  );
};

export default getUsers;
