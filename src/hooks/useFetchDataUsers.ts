import { useState } from "react";
import type { UserDataType } from "../types";
import getUsers from "../fetchers/getUsers";

type FetchDataUsersHooksType = () => [
  UserDataType[],
  boolean,
  (search?: string, errCallback?: (err: string) => void) => void,
  React.Dispatch<React.SetStateAction<UserDataType[]>>
];

const useFetchDataUser: FetchDataUsersHooksType = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataUsers, setDataUsers] = useState<UserDataType[]>([]);

  const fetchDataUsers = (
    search?: string,
    errCallback?: (err: string) => void
  ) => {
    setIsLoading(true);
    getUsers({ per_page: 5, q: search })
      .then((resp) => {
        setDataUsers(resp.data);
      })
      .catch((errMsg: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        errCallback && errCallback(errMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return [dataUsers, isLoading, fetchDataUsers, setDataUsers];
};

export default useFetchDataUser;
