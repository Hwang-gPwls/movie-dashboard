import { NavLink } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";

import { menuItems } from "../public/data";
import { selectedMediaState } from "../recoils/movie/atom";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 100%;
  left: 0;
  background-color: ${props => props.theme.color.blue};
  font-size: 14px;
  padding: 20px 0px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div``;

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled(NavLink)`
  margin: 20px;
  color: ${props => props.theme.color.white};
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${props => props.theme.color.black};
  }

  &.active {
    color: ${props => props.theme.color.lightblue};
  }
`;

const Menu = () => {
  const resetList = useResetRecoilState(selectedMediaState);

  return (
    <Nav>
      <Col>
        <Logo />
        <Items>
          {menuItems.map(item => (
            <Item key={item.key} to={item.path} onClick={resetList}>
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
