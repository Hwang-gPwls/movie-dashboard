import Paper from "@mui/material/Paper";
import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { PaginationResponse, fetchSearchMovies } from "../api/movie";
import MovieModal from "../components/MovieModal";
import MovieTable, { Column } from "../components/MovieTable";
import Paging from "../components/Paging";
import SearchBar from "../components/SearchBar";
import {
  useSearchData,
  useSearchMovieData,
  useSearchPeopleData,
  useSearchTVShowData,
} from "../hooks/queries/movie";
import {
  filteredPaginationState,
  modalPropsState,
  searchKeywordState,
  selectedMovieState,
  selectedValueState,
} from "../recoils/movie/atom";

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
  const page = useRecoilValue(filteredPaginationState("Search"));
  const keyword = useRecoilValue(searchKeywordState);
  const selectedValue = useRecoilValue(selectedValueState);
  const selectedMovie = useRecoilValue(selectedMovieState);
  const handleModalProps = useSetRecoilState(modalPropsState);

  const { data, isFetching } = useSearchMovieData(keyword, page[0].page);

  const { data: TVData, isFetching: TVIsFetching } = useSearchTVShowData(
    keyword,
    page[0].page,
  );

  const searchResult = useMemo(() => (data ? data.results : []), [data]);
  const searchTVResult = useMemo(() => (TVData ? TVData.results : []), [data]);

  const calcPageRange = (totalPage: number) => {
    return Math.ceil(totalPage / 20) > 5 ? 5 : Math.ceil(totalPage / 20);
  };

  useEffect(() => {
    if (selectedMovie.id === -1) {
      return;
    }

    handleModalProps({
      isOpen: true,
      modalType: "Search",
    });
  }, [selectedMovie]);
  console.log(TVData);
  return (
    <Container>
      <SearchBar />

      {searchResult.length && data && TVData ? (
        <>
          <MovieTable
            columns={columns}
            movies={selectedValue === "movie" ? searchResult : searchTVResult}
          />
          <Paging
            pageName="Search"
            itemsCountPerPage={20}
            totalItemsCount={
              selectedValue === "movie"
                ? data.total_results
                : TVData.total_results
            }
            pageRangeDisplayed={
              selectedValue === "movie"
                ? calcPageRange(data.total_results)
                : calcPageRange(TVData.total_results)
            }
          />
        </>
      ) : (
        <div className="no-content">{"검색 결과가 없습니다"}</div>
      )}
      <MovieModal />
    </Container>
  );
};

export default Search;
