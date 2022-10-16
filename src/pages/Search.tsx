import { useEffect, useMemo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import ModalControl from "../components/ModalControl";
import Paging from "../components/Paging";
import PersonLayout from "../components/Person/PersonLatout";
import SearchBar from "../components/SearchBar";
import TableControl from "../components/TableControl";
import { useSearchData } from "../hooks/queries/movie";
import { TVShowColumns, movieColumns } from "../public/data";
import {
  filteredPaginationState,
  modalPropsState,
  searchKeywordState,
  selectedMediaState,
  selectedValueState,
} from "../recoils/movie/atom";

const Container = styled.div`
  width: calc(100% - 200px);
  margin-left: 200px;
  overflow: hidden;
  border: none;
`;

const ContentContainer = styled.div`
  border-top: solid 0.5px;
  text-align: center;
  height: calc(100% - 5rem);
  margin-top: 5rem;

  .no-content {
    margin: 42vh 0 0 0;
    font-size: 30px;
    text-align: center;
  }
`;

const TableBox = styled.div`
  height: 87vh;
  border-bottom: solid 0.1px;
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
    } else if (selectedValue === "tv") {
      setColumns(TVShowColumns);
    }
  }, [selectedValue]);

  return (
    <Container>
      <SearchBar />
      <ContentContainer>
        {data && searchResult.length ? (
          selectedValue === "person" ? (
            <PersonLayout peopleData={searchResult} />
          ) : (
            <>
              <TableBox>
                <TableControl columns={columns} datas={searchResult} />
              </TableBox>

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
      </ContentContainer>
      <ModalControl />
    </Container>
  );
};

export default Search;
