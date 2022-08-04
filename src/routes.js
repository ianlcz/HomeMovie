import Credit from "./pages/credits/[character_id]";
import Home from "./pages/home";
import Login from "./pages/login";
import Create from "./pages/movies/new";
import Delete from "./pages/movies/delete/[reference]/[title]";
import Read from "./pages/movies/[title]";
import Update from "./pages/movies/edit/[reference]/[title]";
import Register from "./pages/register";

const routes = [
  {
    path: "/",
    component: localStorage.getItem("authToken") ? <Home /> : <Login />,
    isProtected: false,
  },
  { path: "/register", component: <Register />, isProtected: false },
  { path: "/movies/new", component: <Create />, isProtected: true },
  { path: "/movies/:title", component: <Read />, isProtected: true },
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
