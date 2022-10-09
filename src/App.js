import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.component";
import routes from "./routes";

const App = () => (
  <Routes>
    {routes.map((r) =>
      r.isProtected ? (
        <Route exact element={<ProtectedRoute />} key={r.path}>
          <Route exact path={r.path} element={r.component} />
        </Route>
      ) : (
        <Route exact path={r.path} element={r.component} key={r.path} />
      ),
    )}
  </Routes>
);

export default App;
