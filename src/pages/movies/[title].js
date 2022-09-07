import { lazy, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "../../auth/AuthContext";
import { getCookieFromBrowser } from "../../auth/cookies";

const HeadBand = lazy(() => import("../../components/Movie/HeadBand/HeadBand"));
const Pane = lazy(() => import("../../components/Movie/Pane/Pane"));

const Read = () => {
  const { getMovieInfo, movies } = useContext(AuthContext);
  const { title } = useParams();
  const [detail, setDetail] = useState({});
  const [directors, setDirectors] = useState([]);
  const [compositors, setCompositors] = useState([]);
  const [charactersCreators, setCharactersCreators] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailers, setTrailers] = useState([]);

  const token = getCookieFromBrowser("authToken");
  const user = jwtDecode(token);
  const year = Number(new URLSearchParams(useLocation().search).get("year"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieFound = movies.filter(
          (m) =>
            m.title.toLowerCase() === decodeURIComponent(title.toLowerCase()) &&
            m.year == year,
        )[0];
        const {
          movie,
          directors,
          compositors,
          characters_creators,
          cast,
          trailers,
        } = await getMovieInfo(
          movieFound ? movieFound : { ref: "Preview", title, year },
        );

        setDetail(movie);
        setDirectors(directors);
        setCompositors(compositors);
        setCharactersCreators(characters_creators);
        setCast(cast);
        setTrailers(trailers);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [movies]);

  return detail.title ? (
    <>
      <Helmet>
        <title>{`${detail.ref ? `${detail.ref} -` : ""} ${
          detail.title
        } | HomeMovie`}</title>
      </Helmet>

      <HeadBand>
        {{ detail, directors, compositors, charactersCreators }}
      </HeadBand>
      <Pane>{{ detail, cast, trailers }}</Pane>
    </>
  ) : null;
};

export default Read;
