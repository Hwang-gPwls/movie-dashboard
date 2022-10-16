import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { fetchAddList } from "../../../api/movie";
import { getAccessToken } from "../../../hooks/auth/getToken";
import { listIdState } from "../../../recoils/movie/atom";

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
  margin-top: 20px !important;
`;

const Add = () => {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["access_token"]);

  const handleListId = useSetRecoilState(listIdState);

  const [fieldValues, setFieldValues] = useState({
    listName: "",
    itemId: "2",
  });

  const handelAddList = async () => {
    debugger;
    let accessToken = cookies.access_token;

    if (accessToken === "undefined" || !accessToken) {
      const token = await getAccessToken();
      setCookie("access_token", token);

      accessToken = token;
    }

    const resultStatus = await fetchAddList(
      Number(fieldValues.itemId),
      fieldValues.listName,
      accessToken,
    );

    if (resultStatus && resultStatus.isSuccess) {
      handleListId(resultStatus.listId);
      navigation("/movie/list");
    }
  };

  const handleSetFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFieldValues({
      ...fieldValues,
      [id]: value,
    });
  };

  return (
    <Container>
      <Box>
        <Text
          id="listName"
          label="List Name"
          variant="outlined"
          onChange={handleSetFieldValue}
        />
        <Text id="itemId" variant="outlined" value={"2"} disabled />
        <Button onClick={handelAddList}>추가</Button>
      </Box>
    </Container>
  );
};

export default Add;
