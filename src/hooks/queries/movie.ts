import { useQuery } from "react-query";

import { PaginationResponse, fetchMovies, fetchSearch } from "../../api/movie";

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

// export function useSearchMovieData(keyword: string, page: number) {
//   return useQuery<PaginationResponse, boolean>(
//     ["searchMovie", { keyword, page }],
//     () => fetchSearchMovies(keyword, page),
//     {
//       keepPreviousData: true,
//       staleTime: 60000,
//     },
//   );
// }

// export function useSearchPeopleData(keyword: string, page: number) {
//   return useQuery<PaginationResponse, boolean>(
//     ["searchPeople", { keyword, page }],
//     () => fetchSearchPeople(keyword, page),
//     {
//       keepPreviousData: true,
//       staleTime: 60000,
//     },
//   );
// }

// export function useSearchTVShowData(keyword: string, page: number) {
//   return useQuery<PaginationResponse, boolean>(
//     ["searchTV", { keyword, page }],
//     () => fetchSearchTVShow(keyword, page),
//     {
//       keepPreviousData: true,
//       staleTime: 60000,
//     },
//   );
// }

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

  //   const searchResult: ITVShow[] | IMovie[] = useMemo(
  //     () => (data ? data.results : []),
  //     [data],
  //   );

  //   if (searchResult && selectedValue === "tv") {
  //     const copySearchResult = [...searchResult];

  //     copySearchResult.map(item => {
  //       const newItem = { ...item };

  //       newItem["title"] = item["name"];
  //       newItem["release_date"] = item["first_air_date"];

  //       delete newItem.name;
  //       delete newItem.first_air_date;

  //       return newItem;
  //     });
  //   }
}
