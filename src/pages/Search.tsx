import Paper from "@mui/material/Paper";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import Modal from "../components/Modal";
import Paging from "../components/Paging";
import PersonLayout from "../components/Person/PersonLatout";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { useSearchData } from "../hooks/queries/movie";
import { TVShowColumns, movieColumns } from "../public/data";
import {
  filteredPaginationState,
  modalPropsState,
  searchKeywordState,
  selectedMediaState,
  selectedValueState,
} from "../recoils/movie/atom";

const Container = styled(Paper)`
  width: 90vw;
  overflow: hidden;
  margin-left: 135px;
`;

const Search = () => {
  const [columns, setColumns] = useState(movieColumns);
  const page = useRecoilValue(filteredPaginationState("Search"));
  const keyword = useRecoilValue(searchKeywordState);
  const selectedValue = useRecoilValue(selectedValueState);
  const media = useRecoilValue(selectedMediaState);
  const handleModalProps = useSetRecoilState(modalPropsState);

  const { data, isFetching } = useSearchData(
    keyword,
    page[0].page,
    selectedValue,
  );

  const searchResult = useMemo(() => (data ? data.results : []), [data]);

  const calcPageRange = (totalPage: number) => {
    return Math.ceil(totalPage / 20) > 5 ? 5 : Math.ceil(totalPage / 20);
  };

  useEffect(() => {
    if (media.id === -1) {
      return;
    }

    handleModalProps({
      isOpen: true,
      modalType: "Search",
    });
  }, [media]);

  useEffect(() => {
    if (selectedValue === "movie") {
      setColumns(movieColumns);
    } else if (selectedValue === "person") {
      setColumns(movieColumns);
    } else if (selectedValue === "tv") {
      setColumns(TVShowColumns);
    }
  }, [selectedValue]);

  return (
    <Container>
      <SearchBar />
      {data ? (
        selectedValue === "person" ? (
          <PersonLayout peopleData={searchResult} />
        ) : (
          <>
            <Table columns={columns} datas={searchResult} />
            <Paging
              pageName="Search"
              itemsCountPerPage={20}
              totalItemsCount={data.total_results}
              pageRangeDisplayed={calcPageRange(data.total_results)}
            />
          </>
        )
      ) : (
        <div className="no-content">{"검색 결과가 없습니다"}</div>
      )}
      <Modal />
    </Container>
  );
};

export default Search;
