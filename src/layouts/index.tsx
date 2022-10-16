import { Outlet } from "react-router";

import Menu from "./SideMenu";

interface LayoutDefaultProps {
  children?: React.ReactElement;
}

const DefaultLayout = ({ children }: LayoutDefaultProps) => {
  return (
    <div>
      <Menu />
      <main>{children || <Outlet />}</main>
    </div>
  );
};

export default DefaultLayout;
