import { atom } from "recoil";

import { IMovie } from "../../api/movie";

export const paginationState = atom<number>({
  key: "paginationState",
  default: 1,
});

export interface ModalProps {
  modalType: "List" | "Search";
  isOpen: boolean;
}

export const modalPropsState = atom<ModalProps>({
  key: "modalOpenState",
  default: {
    modalType: "List",
    isOpen: false,
  },
});

export const selectedMovieState = atom<IMovie>({
  key: "selectedMovieState",
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
