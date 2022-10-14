import { lazy } from "react";

import DefaultLayout from "../layouts/index";

const Login = lazy(() => import("../pages/Login"));
const List = lazy(() => import("../pages/Movie/List"));
const Add = lazy(() => import("../pages/Movie/Item/Add"));
const Update = lazy(() => import("../pages/Movie/Item/Update"));
const Search = lazy(() => import("../pages/Search"));

const routes = [
  {
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <List />,
        path: "/movie/list",
      },
      {
        element: <Add />,
        path: "/movie/item/add",
      },
      {
        element: <Update />,
        path: "/movie/item/update",
      },
      {
        element: <Search />,
        path: "/search",
      },
    ],
    element: <DefaultLayout />,
    path: "/",
  },
];

export default routes;
