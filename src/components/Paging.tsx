import Pagination from "react-js-pagination";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { paginationState } from "../recoils/movie/atom";

interface IPagingProps {
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed: number;
}

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

const Paging = ({
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
}: IPagingProps) => {
  const [page, setPage] = useRecoilState(paginationState);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <PaginationBox>
      <Pagination
        activePage={page}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        prevPageText="‹"
        nextPageText="›"
        onChange={onPageChange}
      />
    </PaginationBox>
  );
};

export default Paging;
