import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import ModalControl from "../../components/ModalControl";
import Paging from "../../components/Paging";
import TableControl, { Column } from "../../components/TableControl";
import { useListMovieData } from "../../hooks/queries/movie";
import {
  filteredPaginationState,
  listIdState,
  modalPropsState,
  selectedMediaState,
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
  width: calc(100% - 200px);
  height: 100vh;
  overflow: hidden;
  margin-left: 200px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 5rem;
  border-bottom: solid 1px;
`;

const TableBox = styled.div`
  height: 88vh;
  border-bottom: solid 0.1px;
`;

const Title = styled.h1`
  font-weight: 600;
`;

const List = () => {
  const navigation = useNavigate();

  const listId = useRecoilValue(listIdState);
  const media = useRecoilValue(selectedMediaState);
  const page = useRecoilValue(filteredPaginationState("List"));
  const handleModalProps = useSetRecoilState(modalPropsState);

  const { data, isLoading, refetch } = useListMovieData(page[0].page, listId);

  const movies = useMemo(() => (data ? data.results : []), [data]);

  const handleRefetch = () => {
    refetch();
  };

  const calcPageRange = (totalPage: number) => {
    return Math.ceil(totalPage / 20) > 5 ? 5 : Math.ceil(totalPage / 20);
  };

  useEffect(() => {
    if (media.id === -1) {
      return;
    }

    handleModalProps({
      isOpen: true,
      modalType: "List",
    });
  }, [media]);

  useEffect(() => {
    handleRefetch();
  }, [listId]);

  return (
    <Container>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Header>
            <Title>{"Movie 조회 목록"}</Title>
            <Button
              onClick={() => {
                navigation("/movie/item/add");
              }}
            >
              추가
            </Button>
          </Header>
          <TableBox>
            <TableControl columns={columns} datas={movies} />
            <Paging
              pageName={"List"}
              itemsCountPerPage={20}
              totalItemsCount={data ? data.total_results : 0}
              pageRangeDisplayed={data ? calcPageRange(data.total_results) : 0}
            />
            <ModalControl handleRefetch={handleRefetch} />
          </TableBox>
        </>
      )}
    </Container>
  );
};

export default List;
