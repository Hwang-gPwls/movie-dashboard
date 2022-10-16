import MovieIcon from "@mui/icons-material/Movie";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";

import { menuItems } from "../public/data";
import { listIdState, selectedMediaState } from "../recoils/movie/atom";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 200px;
  height: 100%;
  left: 0;
  background-color: ${props => props.theme.color.black};
  z-index: 999;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 23.4px;
  margin-right: 7.3px;
  color: ${props => props.theme.color.white};
  font-size: 15px;
`;

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const Item = styled(NavLink)`
  margin: 20px;
  width: 110px;
  padding: 8px;
  border: 0;
  outline: 0;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  transition: color 0.3s ease-in-out;
  color: ${props => props.theme.color.white};
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.color.black};
  }

  &.active {
    background-color: ${props => props.theme.color.white};
    color: ${props => props.theme.color.black};
  }
`;

const Menu = () => {
  return (
    <Nav>
      <Col>
        <IconBox>
          <Avatar sx={{ m: 1 }}>
            <MovieIcon />
          </Avatar>
          {"아무개씨"}
        </IconBox>
        <Items>
          {menuItems.map(item => (
            <Item
              key={item.key}
              to={item.path}
              onClick={() => {
                useResetRecoilState(listIdState);
                useResetRecoilState(selectedMediaState);
              }}
            >
              {item.name}
            </Item>
          ))}
        </Items>
      </Col>
      <Col></Col>
    </Nav>
  );
};

export default Menu;
