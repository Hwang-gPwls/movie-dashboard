import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { fetchUpdateMovieComment } from "../../../api/movie";
import { getAccessToken } from "../../../hooks/auth/getToken";
import { listIdState, selectedMediaState } from "../../../recoils/movie/atom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 200px);
  height: 100%;
  margin-left: 200px;
  overflow: hidden;
  border: none;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40vh;
`;

const Text = styled(TextField)`
  margin-bottom: 10px !important;
`;

const Update = () => {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["access_token"]);

  const [media, setMedia] = useRecoilState(selectedMediaState);
  const listId = useRecoilValue(listIdState);

  const [comment, setComment] = useState("");

  const handelUpdateList = async () => {
    try {
      let accessToken = cookies.access_token;

      if (!accessToken) {
        const token = await getAccessToken();
        setCookie("access_token", token);

        accessToken = token;
      }

      const resultStatus = await fetchUpdateMovieComment(
        media.id,
        listId,
        comment,
        accessToken,
      );

      if (resultStatus) {
        alert("댓글이 추가 되었습니다.");

        navigation("/movie/list");
      }
    } catch (err: unknown) {
      console.error(err);
      setMedia({ ...media, id: -1 });
      alert("서버오류가 발생 했습니다.");

      navigation("/movie/list");
    }
  };

  const handleSetComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setComment(value);
  };

  return (
    <Container>
      <Box>
        <Text
          id="comments"
          label="Comments"
          variant="outlined"
          onChange={handleSetComment}
        />
        <Button onClick={handelUpdateList}>수정</Button>
      </Box>
    </Container>
  );
};

export default Update;
