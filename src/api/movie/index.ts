import axios from "axios";
import { QueryFunctionContext, useInfiniteQuery, useQuery } from "react-query";

import { API_MOVIE_ENDPOINT } from "../../config/config";

export interface PaginationResponse<T> {
  results: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (filters: string) => [...movieKeys.lists(), { filters }] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: number) => [...movieKeys.details(), id] as const,
};

const fetchMoviesWithQuery = async <T>(page: number): Promise<T> => {
  const info = await axios.get(`${API_MOVIE_ENDPOINT}`, {
    params: { page: page },
  });
  return info.data;
};

// const { data, isFetching } = useQuery<PaginationResponse>(
//   ["movies", page],
//   () => fetchMoviesWithQuery<PaginationResponse>(query.repo as string, page),
//   {
//     keepPreviousData: true,
//     refetchOnWindowFocus: true,
//     staleTime: 60000,
//   },
// );

// const useFetchMovies = () =>
//   useInfiniteQuery(
//     movieKeys.lists(),
//     ({ pageParam = 1 }: QueryFunctionContext) =>
//       axios.get(`${API_MOVIE_ENDPOINT}`, {
//         params: { page: pageParam },
//       }),
//     {
//       getNextPageParam: (lastPage: any, pages) => {
//         return lastPage.data.page + 1 > pages[0].data.total_pages
//           ? undefined
//           : lastPage.data.page + 1;
//       },
//     },
//   );

export default fetchMoviesWithQuery;
