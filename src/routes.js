import { lazy } from "react";
import Login from "./pages/login.page";
import Register from "./pages/register.page";

/* Movies pages */
import Create from "./pages/movies/new.page";
import Read from "./pages/movies/[title].page";
import Update from "./pages/movies/edit/[reference]/[title].page";
import Delete from "./pages/movies/delete/[reference]/[title].page";

/* Credits pages */
import Credit from "./pages/credits/[character_id]";

const Home = lazy(() => import("./pages/index.page"));

const routes = [
  {
    path: "/",
    component: localStorage.getItem("authToken") ? <Home /> : <Login />,
    isProtected: false,
  },
  { path: "/register", component: <Register />, isProtected: false },
  { path: "/movies/new", component: <Create />, isProtected: true },
  { path: "/movies/:title/:year", component: <Read />, isProtected: true },
  {
    path: "/movies/edit/:reference/:title",
    component: <Update />,
    isProtected: true,
  },
  {
    path: "/movies/delete/:reference/:title",
    component: <Delete />,
    isProtected: true,
  },
  { path: "/credits/:character_id", component: <Credit />, isProtected: true },
];

export default routes;
