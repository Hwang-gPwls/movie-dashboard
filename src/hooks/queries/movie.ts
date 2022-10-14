import { useQuery } from "react-query";

import {
  PaginationResponse,
  fetchMovies,
  fetchSearchMovies,
  fetchSearchPeople,
  fetchSearchTVShow,
} from "../../api/movie";

export function useListMovieData(page: number) {
  return useQuery<PaginationResponse, boolean>(
    ["movies", page],
    () => fetchMovies(page),
    {
      keepPreviousData: true,
      staleTime: 60000,
    },
  );
}

export function useSearchMovieData(keyword: string, page: number) {
  return useQuery<PaginationResponse, boolean>(
    ["searchMovie", { keyword, page }],
    () => fetchSearchMovies(keyword, page),
    {
      keepPreviousData: true,
      staleTime: 60000,
    },
  );
}

export function useSearchPeopleData(keyword: string, page: number) {
  return useQuery<PaginationResponse, boolean>(
    ["searchPeople", { keyword, page }],
    () => fetchSearchPeople(keyword, page),
    {
      keepPreviousData: true,
      staleTime: 60000,
    },
  );
}

export function useSearchTVShowData(keyword: string, page: number) {
  return useQuery<PaginationResponse, boolean>(
    ["searchTV", { keyword, page }],
    () => fetchSearchTVShow(keyword, page),
    {
      keepPreviousData: true,
      staleTime: 60000,
    },
  );
}

export function useSearchData(
  keyword: string,
  page: number,
  selectedValue: "movie" | "people" | "TV",
) {
  if (selectedValue === "movie") {
    useSearchMovieData(keyword, page);
  }

  if (selectedValue === "people") {
    useSearchPeopleData(keyword, page);
  }

  if (selectedValue === "TV") {
    useSearchTVShowData(keyword, page);
  }
}
