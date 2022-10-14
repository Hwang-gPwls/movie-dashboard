import Paper from "@mui/material/Paper";
import React, { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { PaginationResponse, fetchMovies } from "../../api/movie";
import MovieModal from "../../components/MovieModal";
import MovieTable, { Column } from "../../components/MovieTable";
import Paging from "../../components/Paging";
import { useListMovieData } from "../../hooks/queries/movie";
import {
  filteredPaginationState,
  modalPropsState,
  selectedMovieState,
} from "../../recoils/movie/atom";

const columns: Column[] = [
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "backdrop_path",
    label: "Image",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "vote_average",
    label: "Vote Average",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "vote_count",
    label: "Vote count",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "release_date",
    label: "Release Date",
    minWidth: 170,
    display: "table-cell",
    align: "center",
  },
  {
    id: "overview",
    label: "Overview",
    minWidth: 170,
    display: "none",
    align: "center",
  },
];

const Container = styled(Paper)`
  width: 90vw;
  overflow: hidden;
  margin-left: 135px;
`;

const List = () => {
  const page = useRecoilValue(filteredPaginationState("List"));
  const selectedMovie = useRecoilValue(selectedMovieState);
  const handleModalProps = useSetRecoilState(modalPropsState);

  const { data, isFetching } = useListMovieData(page[0].page);

  const movies = useMemo(() => (data ? data.results : []), [data]);

  const calcPageRange = (totalPage: number) => {
    return Math.ceil(totalPage / 20) > 5 ? 5 : Math.ceil(totalPage / 20);
  };

  useEffect(() => {
    if (selectedMovie.id === -1) {
      return;
    }

    handleModalProps({
      isOpen: true,
      modalType: "List",
    });
  }, [selectedMovie]);

  return (
    <Container>
      <MovieTable columns={columns} movies={movies} />
      <Paging
        pageName={"List"}
        itemsCountPerPage={20}
        totalItemsCount={data ? data.total_results : 0}
        pageRangeDisplayed={data ? calcPageRange(data.total_results) : 0}
      />
      <MovieModal />
    </Container>
  );
};

export default List;
