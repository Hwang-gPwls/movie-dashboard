import axios from "axios";

import {
  API_MOVIE_DELETE_ENDPOINT,
  API_MOVIE_ENDPOINT,
  API_MOVIE_SEARCH_MOVIE_ENDPOINT,
  API_MOVIE_SEARCH_PEOPLE_ENDPOINT,
  API_MOVIE_SEARCH_TV_ENDPOINT,
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

  [prop: string]: string | number;
}

export const fetchMovies = async <T>(page: number): Promise<T> => {
  const info = await axios.get(`${API_MOVIE_ENDPOINT}`, {
    params: { page: page },
  });
  return info.data;
};

export const deleteMovie = async <T>(page: number): Promise<T> => {
  const info = await axios.post(`${API_MOVIE_ENDPOINT}`, {
    params: { page: page },
  });
  return info.data;
};

export const fetchSearchMovies = async <T>(
  query: string,
  page: number,
): Promise<T> => {
  const result = await axios.get(`${API_MOVIE_SEARCH_MOVIE_ENDPOINT}`, {
    params: { query: query, page: page },
  });

  return result.data;
};

export const fetchSearchPeople = async <T>(
  query: string,
  page: number,
): Promise<T> => {
  const result = await axios.get(`${API_MOVIE_SEARCH_PEOPLE_ENDPOINT}`, {
    params: { query: query, page: page },
  });

  return result.data;
};

export const fetchSearchTVShow = async <T>(
  query: string,
  page: number,
): Promise<T> => {
  const result = await axios.get(`${API_MOVIE_SEARCH_TV_ENDPOINT}`, {
    params: { query: query, page: page },
  });

  return result.data;
};
