import { lazy } from "react";

import DefaultLayout from "../layouts/index";

const Login = lazy(() => import("../pages/Login"));
const List = lazy(() => import("../pages/Movie/List"));
const Search = lazy(() => import("../pages/Search"));

const routes = [
  {
    children: [
      {
        element: <Login />,
        index: true,
      },
      {
        element: <List />,
        path: "/movie/list",
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
