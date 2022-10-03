import { lazy, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "../../auth/AuthContext";
import { getCookieFromBrowser } from "../../auth/cookies";
import { decodeSlug, encodeSlug } from "../../utils";

const HeadBand = lazy(() => import("../../components/Movie/HeadBand/HeadBand"));
const Pane = lazy(() => import("../../components/Movie/Pane/Pane"));

const Read = () => {
  const { getMovieInfo, movies } = useContext(AuthContext);
  const { title, year } = useParams();
  const [detail, setDetail] = useState({});
  const [directors, setDirectors] = useState([]);
  const [compositors, setCompositors] = useState([]);
  const [charactersCreators, setCharactersCreators] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState({});

  const token = getCookieFromBrowser("authToken");
  const user = jwtDecode(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieFound = movies.filter(
          (m) =>
            decodeSlug(encodeSlug(m.title)) === decodeSlug(title) &&
            m.year == year,
        )[0];
        const {
          movie,
          directors,
          compositors,
          characters_creators,
          cast,
          trailer,
        } = await getMovieInfo(
          movieFound
            ? movieFound
            : { ref: "Preview", title: decodeSlug(encode(title)), year },
        );

        setDetail(movie);
        setDirectors(directors);
        setCompositors(compositors);
        setCharactersCreators(characters_creators);
        setCast(cast);
        setTrailer(trailer);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [movies]);

  return detail.title ? (
    <>
      <Helmet>
        <title>{`${
          detail.code &&
          (detail.code === "Vu au cinéma" || detail.code === "Vu en streaming")
            ? `${detail.code} -`
            : detail.ref
            ? `${detail.ref} -`
            : ""
        } ${detail.title} | HomeMovie`}</title>
      </Helmet>

      <HeadBand>
        {{ detail, directors, compositors, charactersCreators }}
      </HeadBand>
      <Pane>{{ detail, cast, trailer }}</Pane>
    </>
  ) : null;
};

export default Read;
