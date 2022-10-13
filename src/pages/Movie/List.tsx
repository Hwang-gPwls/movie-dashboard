import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import fetchMoviesWithQuery, { PaginationResponse } from "../../api/movie";

const Container = styled.div`
  margin-left: 200px;
`;

const List = () => {
  const [page, setPage] = useState(0);

  const { data, isFetching } = useQuery(
    ["movies", page],
    () => fetchMoviesWithQuery(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      staleTime: 60000,
    },
  );

  return <Container>List</Container>;
};

export default List;
