import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { isBrowser, isMobileOnly } from "react-device-detect";
import axios from "axios";
import jwtDecode from "jwt-decode";

import Card from "../../../../components/Movie/Card.component";
import Submit from "../../../../components/Submit.component";
import Score from "../../../../components/Movie/HeadBand/Score.component";
import ReadingTime from "../../../../components/Movie/HeadBand/ReadingTime.component";
import Poster from "../../../../components/Poster.component";
import Background from "../../../../components/Movie/Background.component";
import PopUp from "../../../../components/PopUp.component";

import AuthContext from "../../../../contexts/auth.context";
import PopUpContext from "../../../../contexts/pop-up.context";

import { decodeSlug, encodeSlug } from "../../../../utils";
import { getCookieFromBrowser } from "../../../../cookies";

const Update = () => {
  const user = jwtDecode(getCookieFromBrowser("authToken"));
  const { movies } = useContext(AuthContext);
  const { isShow, setIsShow } = useContext(PopUpContext);

  const navigate = useNavigate();
  const { reference, title } = useParams();

  const [newTitle, setNewTitle] = useState("");
  const [newRef, setNewRef] = useState("");
  const [movie, setMovie] = useState({});
  let [newMovie, setNewMovie] = useState({});
  const [suggestion, setSuggestion] = useState([]);
  const [newCode, setNewCode] = useState(undefined);
  const [movieToPopUp, setMovieToPopUp] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      setMovie(
        movies.find((m) =>
          m.ref && m.title
            ? m.ref === reference &&
              decodeSlug(encodeSlug(m.title)) === decodeSlug(title)
            : undefined,
        ),
      );

      document.title =
        `Modification ${
          movie ? "de " + movie.title : "d'un film"
        } | HomeMovie` || "";

      if (newTitle !== "") {
        setSuggestion(
          await axios
            .get(
              `https://api.themoviedb.org/3/search/movie?query=${newTitle.trim()}&api_key=${
                process.env.REACT_APP_API_KEY
              }&language=fr-FR`,
            )
            .then((res) => res.data.results)
            .catch((err) => console.error(err.message)),
        );
      } else {
        setSuggestion([]);
      }
    };

    fetchMovie();
    document.addEventListener("keydown", detectKeyDown, true);
  }, [movies, reference, title, newTitle]);

  const detectKeyDown = (e) => {
    if (e.key === "Escape") {
      navigate("/");
      window.location.reload(false);
    }
  };

  const handlePopUp = async ({ detail }, movieId = 0) => {
    if (detail === 2 && isBrowser) {
      setMovieToPopUp(
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
          )
          .then((res) => res.data)
          .catch((err) => console.error(err.message)),
      );
      setIsShow(true);
    } else {
      setMovieToPopUp({});
      setIsShow(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const today = new Date();
    newMovie = {
      ref: newRef === "" ? movie.ref : newRef,
      title: newMovie.title
        ? newMovie.title.toLowerCase()
        : movie.title.toLowerCase(),
      genre: newMovie.genre_ids ? newMovie.genre_ids : movie.genre,
      code: newCode ? Number(newCode) : movie.code,
      purchaseYear: movie.purchaseYear,
      year: newMovie.release_date
        ? new Date(newMovie.release_date).getFullYear()
        : movie.year,
    };

    if (user && (newRef !== "" || newTitle !== "" || newCode)) {
      await axios
        .put(`/api/collection/${user.movies}`, {
          movie,
          newMovie,
        })
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      navigate(`/movies/${encodeSlug(newMovie.title)}/${newMovie.year}`);
      window.location.reload(false);
    }
  };

  return (
    <>
      {isShow ? (
        <PopUp
          onClick={async (e) => await handlePopUp(e)}
          isShow
          content={
            <Background
              data={{
                cover: `https://image.tmdb.org/t/p/original/${movieToPopUp.backdrop_path}`,
                title: movieToPopUp.title,
              }}
              onPopUp
            >
              <div className={`flex flex-row p-6 items-center justify-evenly`}>
                <Poster onPopUp>
                  {{
                    poster_path: movieToPopUp.poster_path,
                    title: movieToPopUp.title,
                  }}
                </Poster>

                <div className="flex flex-col ml-4">
                  <h1 className="flex flex-row w-full items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-b lg:bg-gradient-to-r from-white/90 to-white/70 flex-wrap text-2xl font-semibold">
                    {movieToPopUp.title}

                    {new Date(movieToPopUp.release_date).getTime() <
                    new Date().getTime() ? (
                      <span className="ml-2 text-lg font-light">
                        ({new Date(movieToPopUp.release_date).getFullYear()})
                      </span>
                    ) : undefined}
                  </h1>

                  {movieToPopUp.original_title.toLowerCase() !==
                  movieToPopUp.title
                    .replace(" : ", ": ")
                    .replace(" ! ", "! ")
                    .toLowerCase() ? (
                    <p className="mt-2 text-sm italic text-white/90 text-center">
                      {movieToPopUp.original_title}
                    </p>
                  ) : undefined}

                  <div
                    className={`flex flex-row items-center w-max mx-auto mt-2 ${
                      movieToPopUp.original_title.toLowerCase() ===
                        movieToPopUp.title
                          .replace(" : ", ": ")
                          .replace(" ! ", "! ")
                          .toLowerCase() &&
                      new Date(movieToPopUp.release_date).getTime() <
                        new Date().getTime()
                        ? "lg:-my-1"
                        : movieToPopUp.runtime && movieToPopUp.runtime > 0
                        ? "my-0"
                        : "my-4"
                    }`}
                  >
                    {movieToPopUp.genres && (
                      <>
                        <ul className="flex flex-row font-light">
                          {isMobileOnly
                            ? movieToPopUp.genres
                                .slice(0, 2)
                                .map((g, index) => (
                                  <li
                                    key={g.name}
                                    className={`ml-1 ${
                                      index === 1 ? "truncate" : undefined
                                    }`}
                                  >
                                    <p className="text-sm">
                                      {g.name}
                                      {index === 1 ? undefined : ", "}
                                    </p>
                                  </li>
                                ))
                            : movieToPopUp.genres.map((g, index) => (
                                <li
                                  key={g.name}
                                  className={`ml-1 ${
                                    index === movieToPopUp.genres.length - 1
                                      ? "truncate"
                                      : undefined
                                  }`}
                                >
                                  <p className="text-sm">
                                    {g.name}
                                    {index === movieToPopUp.genres.length - 1
                                      ? undefined
                                      : ", "}
                                  </p>
                                </li>
                              ))}
                        </ul>

                        {movieToPopUp.runtime > 0 ? (
                          <>
                            {movieToPopUp.genres.length > 0 ? (
                              <p className="mx-2">&bull;</p>
                            ) : undefined}
                            <ReadingTime>{movieToPopUp.runtime}</ReadingTime>
                          </>
                        ) : undefined}
                      </>
                    )}
                  </div>

                  {movieToPopUp.tagline ? (
                    <p className="mt-1 text-blue-200 font-light text-sm">
                      {movieToPopUp.tagline}
                    </p>
                  ) : undefined}

                  {movieToPopUp.overview ? (
                    <>
                      <h2 className="mt-2 mb-2 text-left text-lg font-medium">
                        Synopsis
                      </h2>
                      <p className="leading-snug font-light text-sm text-justify">
                        {movieToPopUp.overview}
                      </p>
                    </>
                  ) : undefined}

                  <Score onPopUp>
                    {{
                      vote_average: movieToPopUp.vote_average,
                      budget: movieToPopUp.budget,
                      revenue: movieToPopUp.revenue,
                      isReleased:
                        new Date(movieToPopUp.release_date).getTime() <
                        new Date().getTime(),
                    }}
                  </Score>
                </div>
              </div>
            </Background>
          }
        />
      ) : undefined}

      <div className="flex flex-col bg-blue-100 dark:bg-slate-800 min-h-screen">
        <div className="w-fit mx-auto my-auto p-8 bg-white dark:bg-slate-600 rounded-xl shadow-lg">
          <h1 className="mb-6 font-semibold text-2xl text-center text-blue-800 dark:text-blue-500">
            Voulez-vous modifier ce film ?
          </h1>
          <form onSubmit={handleEdit}>
            {movie ? (
              <ul className="my-4">
                <li className="flex flex-row items-center w-max mx-auto px-2 rounded-full text-white bg-gradient-to-br from-blue-800 to-blue-400 truncate">
                  <p className="text-sm font-bold mr-1">{`${movie.ref} -`}</p>
                  <p className="mr-2 text-sm font-semibold">{movie.title}</p>
                  <p className="text-sm">{`(${movie.year})`}</p>
                </li>
              </ul>
            ) : undefined}

            <label className="flex justify-center my-3 text-blue-800 dark:text-blue-500 font-medium">
              par
            </label>

            <div className="flex justify-center">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="newRef"
                    placeholder="Nouvelle référence"
                    value={newRef}
                    onChange={(e) => setNewRef(e.target.value)}
                    className="w-full px-4 py-1 text-sm text-blue-400 focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner"
                  />

                  <select
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-max mt-6 px-4 py-1 text-sm text-blue-400 border border-blue-500 appearance-none focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 bg-white dark:bg-slate-800 font-medium rounded transition duration-700 ease-in-out"
                  >
                    <option>--Choisir un code--</option>
                    <option value={1}>Vu</option>
                    <option value={3}>Vu au cinéma</option>
                    <option value={6}>Vu en streaming</option>
                    <option value={4}>Pas vu</option>
                    <option value={5}>Souhait</option>
                  </select>
                </div>

                <label className="my-2 lg:mx-4 text-blue-500 text-sm">
                  et/ou
                </label>

                <input
                  type="text"
                  name="newTitle"
                  placeholder="Nouveau titre"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-1 text-sm text-blue-400 focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner"
                />
              </div>
            </div>

            {suggestion && suggestion.length > 0 ? (
              <ul
                className={`my-8 w-max m-auto ${
                  suggestion.length === 1
                    ? ""
                    : "grid grid-flow-row lg:grid-flow-col grid-rows-[repeat(8, minmax(0, 1fr))] lg:grid-cols-2 lg:grid-rows-4 gap-8"
                }`}
              >
                {suggestion
                  .filter((m) => m.poster_path)
                  .slice(0, 8)
                  .map((m) => (
                    <Card
                      key={m.id}
                      onClick={async (e) => {
                        setNewTitle(m.title);
                        setNewMovie(m);

                        await handlePopUp(e, m.id);
                      }}
                      isClicked={newTitle === m.title}
                    >
                      {m}
                    </Card>
                  ))}
              </ul>
            ) : undefined}

            <Submit buttonTitle="Oui" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
