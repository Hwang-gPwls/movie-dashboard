import { atom, selectorFamily } from "recoil";

import { IMovie, ITVShow } from "../../api/movie";

export interface IPaginationProps {
  pageName: "List" | "Search";
  page: number;
}

export const paginationState = atom<IPaginationProps[]>({
  key: "paginationState",
  default: [
    { pageName: "List", page: 1 },
    { pageName: "Search", page: 1 },
  ],
});

export const filteredPaginationState = selectorFamily<
  IPaginationProps[],
  string
>({
  key: "filteredPaginationState",
  get:
    (param: string) =>
    ({ get }) =>
      get(paginationState).filter(page => page.pageName === `${param}`),
});

export interface IModalProps {
  modalType: "List" | "Search";
  isOpen: boolean;
}

export const modalPropsState = atom<IModalProps>({
  key: "modalOpenState",
  default: {
    modalType: "List",
    isOpen: false,
  },
});

export const selectedMediaState = atom<IMovie | ITVShow>({
  key: "selectedMediaState",
  default: {
    id: -1,
    backdrop_path: "",
    title: "",
    vote_average: 0,
    vote_count: 0,
    release_date: "",
    overview: "",
  },
});

export const searchKeywordState = atom<string>({
  key: "searchKeywordState",
  default: ".",
});

export const selectedValueState = atom<string>({
  key: "selectedValueState",
  default: "movie",
});

export const listIdState = atom<number>({
  key: "listIdState",
  default: 1,
});
