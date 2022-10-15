import axios from "axios";

import {
  API_MOVIE_DELETE_ENDPOINT,
  API_MOVIE_ENDPOINT,
  API_SEARCH_ENDPOINT,
} from "../../config/config";

export interface PaginationResponse {
  results: [];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  id: number;
  backdrop_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
  media_type?: string;

  [prop: string]: string | number | undefined;
}

export interface ITVShow {
  id: number;
  backdrop_path: string;
  name?: string;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
  overview: string;
  media_type?: string;

  [prop: string]: string | number | undefined;
}

export interface IPerson {
  id: number;
  name: string;
  known_for_department: string;
  known_for: IMovie[] | ITVShow[];
  profile_path?: string;
  media_type?: string;

  [prop: string]: string | number | undefined | IMovie[] | ITVShow[];
}

export const fetchMovies = async <T>(page: number): Promise<T> => {
  const info = await axios.get(`${API_MOVIE_ENDPOINT}`, {
    params: { page: page },
  });
  return info.data;
};

export const fetchSearch = async <T>(
  query: string,
  page: number,
  apiName: string,
): Promise<T> => {
  const result = await axios.get(`${API_SEARCH_ENDPOINT}/${apiName}`, {
    params: {
      api_key: "53625729d89913408f4080ba52932fec",
      language: "ko-KR",
      page: page,
      query: query,
      include_adult: false,
    },
  });

  return result.data;
};

export const deleteMovie = async <T>(page: number): Promise<T> => {
  const info = await axios.post(`${API_MOVIE_ENDPOINT}`, {
    params: { page: page },
  });
  return info.data;
};
