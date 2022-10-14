import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { IMovie } from "../api/movie";
import { selectedMovieState } from "../recoils/movie/atom";

interface IMovieTableProps {
  columns: Column[];
  movies: IMovie[];
}

export interface Column {
  id:
    | "title"
    | "backdrop_path"
    | "vote_average"
    | "vote_count"
    | "release_date"
    | "overview";
  label: string;
  display: "table-cell" | "none";
  minWidth?: number;
  align?: "center";
}

const BodyRow = styled(TableRow)`
  cursor: pointer;
`;

const MovieTable = ({ columns, movies }: IMovieTableProps) => {
  const [movieState, setMovieState] = useRecoilState(selectedMovieState);

  const handleTableRowClick = (
    e: React.MouseEvent<HTMLElement>,
    id: number,
  ) => {
    const children = [].slice.call(e.currentTarget.children);
    const copyMovieState = { ...movieState };

    copyMovieState["id"] = id;

    children.forEach((child: HTMLElement) => {
      const [key, value] = [child.id, child.innerText];
      copyMovieState[key] = value;
    });

    setMovieState(copyMovieState);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    display: column.display,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie: IMovie) => {
              return (
                <BodyRow
                  hover
                  tabIndex={-1}
                  key={movie.id}
                  onClick={e => handleTableRowClick(e, movie.id)}
                >
                  {columns.map(column => {
                    return (
                      <TableCell
                        key={column.id}
                        id={column.id}
                        align={column.align}
                        style={{
                          display: column.display,
                        }}
                      >
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
                </BodyRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MovieTable;
