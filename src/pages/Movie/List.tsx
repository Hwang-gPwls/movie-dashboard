import { Pagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import fetchMoviesWithQuery, { PaginationResponse } from "../../api/movie";

interface IMovie {
  id: string;
  backdrop_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
}

interface Column {
  id:
    | "title"
    | "backdrop_path"
    | "vote_average"
    | "vote_count"
    | "release_date";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "backdrop_path",
    label: "Image",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "vote_average",
    label: "Vote Average",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "vote_count",
    label: "Vote count",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "release_date",
    label: "Release Date",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
];

const Container = styled(Paper)`
  width: 90vw;
  overflow: hidden;
  margin-left: 135px;
`;

const List = () => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery<PaginationResponse, boolean>(
    ["movies", page],
    () => fetchMoviesWithQuery(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      staleTime: 60000,
    },
  );

  const movies = useMemo(() => (data ? data.results : []), [data]);

  const onPageChange = (e: React.ChangeEvent<unknown>) => {
    const button = e.target as HTMLElement;
    setPage(Number(button.innerText));
  };

  console.log(data);

  return (
    <Container>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie: IMovie) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={movie.id}>
                  {columns.map(column => {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "backdrop_path" ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w342${
                              movie[column.id]
                            }`}
                            alt="poster"
                          />
                        ) : (
                          movie[column.id]
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={data ? data.total_pages : 0}
        variant="outlined"
        shape="rounded"
        onChange={onPageChange}
      />
    </Container>
  );
};

export default List;
