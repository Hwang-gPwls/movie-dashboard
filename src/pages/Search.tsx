import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import MovieModal from "../components/MovieModal";
import MovieTable, { Column } from "../components/MovieTable";
import Paging from "../components/Paging";

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

const Search = () => {
  return (
    <Container>
      {/* <MovieTable columns={columns} movies={movies} />
    <Paging
      itemsCountPerPage={20}
      totalItemsCount={data ? data.total_results : 0}
      pageRangeDisplayed={data ? calcPageRange(data.total_results) : 0}
    /> */}
      <MovieModal />
    </Container>
  );
};

export default Search;
