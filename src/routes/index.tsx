import { lazy } from "react";
import { Navigate } from "react-router";

import DefaultLayout from "../layouts/index";

const Login = lazy(() => import("../pages/Login"));
const List = lazy(() => import("../pages/Movie/List"));
const Add = lazy(() => import("../pages/Movie/Item/Add"));
const Update = lazy(() => import("../pages/Movie/Item/Update"));
const Search = lazy(() => import("../pages/Search"));

const routes = (isLogin: boolean) => [
  {
    path: "/",
    element: isLogin ? <Navigate to="/movie/list" /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/search",
    element: <DefaultLayout />,
    children: [{ element: <Search />, path: "/search" }],
  },
  {
    path: "/movie",
    element: <DefaultLayout />,
    children: [
      { element: <List />, path: "/movie/list" },
      {
        element: <Add />,
        path: "/movie/item/add",
      },
      {
        element: <Update />,
        path: "/movie/item/update",
      },
    ],
  },
];

export default routes;
