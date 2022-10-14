import axios from "axios";

import {
  API_MOVIE_DELETE_ENDPOINT,
  API_MOVIE_ENDPOINT,
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

export const fetchMoviesWithQuery = async <T>(page: number): Promise<T> => {
  const info = await axios.get(`${API_MOVIE_ENDPOINT}`, {
    params: { page: page },
  });
  return info.data;
};

export const deleteMovie = async <T>(movieId: number): Promise<T> => {
  const result = await axios.post(`${API_MOVIE_DELETE_ENDPOINT}`, {
    params: { items: [{ media_type: "movie", media_id: movieId }] },
  });

  return result.data;
};
