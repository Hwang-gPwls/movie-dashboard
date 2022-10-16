import { AxiosError } from "axios";
import { UseMutationResult, useMutation, useQuery } from "react-query";

import {
  IDeleteItem,
  PaginationResponse,
  fetchDeleteMovie,
  fetchMovies,
  fetchSearch,
} from "../../api/movie";

export function useListMovieData(page: number, listId: number) {
  return useQuery<PaginationResponse, boolean>(
    ["movies", page],
    () => fetchMovies(page, listId),
    {
      keepPreviousData: true,
      staleTime: 60000,
    },
  );
}

export function useSearchData(
  keyword: string,
  page: number,
  selectedValue: string,
) {
  return useQuery<PaginationResponse, boolean>(
    ["search", { keyword, page, selectedValue }],
    () => fetchSearch(keyword, page, selectedValue),
    {
      keepPreviousData: true,
      staleTime: 60000,
    },
  );
}

export default function useDeleteList(): UseMutationResult<
  boolean,
  AxiosError,
  IDeleteItem
> {
  return useMutation(fetchDeleteMovie, {
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
  });
}
