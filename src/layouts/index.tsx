import { Outlet } from "react-router";

import Menu from "./Menu";

interface LayoutDefaultProps {
  children?: React.ReactElement;
}

const DefaultLayout = ({ children }: LayoutDefaultProps) => {
  return (
    <div>
      <main>{children || <Outlet />}</main>
      <Menu />
    </div>
  );
};

export default DefaultLayout;
