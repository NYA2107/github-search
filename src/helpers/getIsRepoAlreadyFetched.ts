import type { RepoViewType } from "../types";

const getIsRepoAlreadyFetched = (repoView: RepoViewType[], idUser: string) => {
  const filterRepo = repoView.filter((repoView) => repoView.id === idUser);
  return filterRepo.length > 0;
};

export default getIsRepoAlreadyFetched;
