import Credit from "./pages/Credit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Create from "./pages/movie/create";
import Delete from "./pages/movie/delete";
import Read from "./pages/movie/read";
import Update from "./pages/movie/update";
import Register from "./pages/Register";

const routes = [
  {
    path: "/",
    component: localStorage.getItem("authToken") ? <Home /> : <Login />,
    isProtected: false,
  },
  { path: "/register", component: <Register />, isProtected: false },
  { path: "/new", component: <Create />, isProtected: true },
  { path: "/movie/:title", component: <Read />, isProtected: true },
  { path: "/edit/:reference/:title", component: <Update />, isProtected: true },
  {
    path: "/delete/:reference/:title",
    component: <Delete />,
    isProtected: true,
  },
  { path: "/credit/:title", component: <Credit />, isProtected: true },
];

export default routes;
