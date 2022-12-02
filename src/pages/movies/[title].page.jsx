import { lazy, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "../../contexts/auth.context";
import { getCookieFromBrowser } from "../../cookies";
import { decodeSlug, encodeSlug } from "../../utils";
import { Helmet } from "react-helmet";

const HeadBand = lazy(() =>
  import("../../components/Movie/HeadBand/HeadBand.component"),
);
const Pane = lazy(() => import("../../components/Movie/Pane/Pane.component"));

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
            decodeSlug(encodeSlug(m.title)) === decodeSlug(encodeSlug(title)) &&
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
            : { ref: "Preview", title: decodeSlug(encodeSlug(title)), year },
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
      <Helmet
        meta={[
          { name: "description", content: `${detail.overview}` },
          {
            name: "application-name",
            content: `${
              detail.code &&
              (detail.code === "Vu au cinéma" ||
                detail.code === "Vu en streaming")
                ? `${detail.code} -`
                : detail.ref
                ? `${detail.ref} -`
                : ""
            } ${detail.title} (${new Date(
              detail.release_date,
            ).getFullYear()}) | HomeMovie`,
          },
          {
            name: "apple-mobile-web-app-title",
            content: `${
              detail.code &&
              (detail.code === "Vu au cinéma" ||
                detail.code === "Vu en streaming")
                ? `${detail.code} -`
                : detail.ref
                ? `${detail.ref} -`
                : ""
            } ${detail.title} (${new Date(
              detail.release_date,
            ).getFullYear()}) | HomeMovie`,
          },
          {
            property: "og:image",
            content: `https://image.tmdb.org/t/p/original/${detail.backdrop_path}`,
          },
          {
            property: "og:image:secure_url",
            content: `https://image.tmdb.org/t/p/original/${detail.backdrop_path}`,
          },
        ]}
      >
        <title>
          {`${
            detail.code &&
            (detail.code === "Vu au cinéma" ||
              detail.code === "Vu en streaming")
              ? `${detail.code} -`
              : detail.ref
              ? `${detail.ref} -`
              : ""
          } ${detail.title} (${new Date(
            detail.release_date,
          ).getFullYear()}) | HomeMovie` || ""}
        </title>
      </Helmet>
      <HeadBand>
        {{ detail, directors, compositors, charactersCreators }}
      </HeadBand>
      <Pane>{{ detail, cast, trailer }}</Pane>
    </>
  ) : undefined;
};

export default Read;
