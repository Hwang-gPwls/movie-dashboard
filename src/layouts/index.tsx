import { Outlet } from "react-router";

import Header from "./Header";
import Menu from "./SideMenu";

interface LayoutDefaultProps {
  children?: React.ReactElement;
}

const DefaultLayout = ({ children }: LayoutDefaultProps) => {
  return (
    <div>
      <Menu />
      <Header />
      <main>{children || <Outlet />}</main>
    </div>
  );
};

export default DefaultLayout;
