import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from "@mui/material";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { searchKeywordState } from "../recoils/movie/atom";
import SelectControl from "./SelectControl";

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  top: 7px;
  z-index: 999;
`;

const SearchButton = styled(Button)`
  width: 9.5rem;
  background-color: #434656 !important;
  color: white;
  border-radius: 0 10px 10px 0 !important;
  z-index: 999;
`;

const SearchInput = styled(TextField)`
  width: 35.5rem;
  background-color: #fff;
  border-radius: 10px 0 0 10px;
  z-index: 999;
`;

const SearchBar = () => {
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);
  const [inputVal, setInputVal] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  const onChange: ComponentProps<"input">["onChange"] = e => {
    const { value } = e.target;
    setInputVal(value);
  };

  const handleOnClick = () => {
    setKeyword(inputVal === "" ? "." : inputVal.replace(" ", "+"));
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnClick();
    }
  };

  useEffect(() => {
    if (keyword) {
      setInputVal(keyword === "." ? "" : keyword.replace("+", " "));
    }
  }, []);

  return (
    <Container>
      <SelectControl />
      <SearchInput
        id="searchKeyword"
        label="Search"
        variant="outlined"
        ref={searchInput}
        onChange={onChange}
        onKeyDown={onKeyPress}
        value={inputVal}
      />

      <SearchButton
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleOnClick}
      >
        검색
      </SearchButton>
    </Container>
  );
};

export default SearchBar;
