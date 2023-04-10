import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isBrowser, isMobileOnly } from "react-device-detect";
import axios from "axios";

import Background from "../../components/Movie/Background.component";
import PopUp from "../../components/PopUp.component";
import Card from "../../components/Movie/Card.component";
import Submit from "../../components/Submit.component";
import ReadingTime from "../../components/Movie/HeadBand/ReadingTime.component";
import Poster from "../../components/Poster.component";
import Score from "../../components/Movie/HeadBand/Score.component";

import AuthContext from "../../contexts/auth.context";
import PopUpContext from "../../contexts/pop-up.context";

import { encodeSlug } from "../../utils";

const Create = () => {
  const { user } = useContext(AuthContext);
  const { isShow, setIsShow } = useContext(PopUpContext);

  const navigate = useNavigate();

  const [ref, setRef] = useState("");
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [genre, setGenre] = useState([]);
  const [year, setYear] = useState(0);
  const [movieToPopUp, setMovieToPopUp] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      document.title = `Ajout d'un nouveau film | HomeMovie` || "";

      if (title !== "") {
        const data = await axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${title.trim()}&api_key=${
              process.env.REACT_APP_API_KEY
            }&language=fr-FR`,
          )
          .then((res) => res.data.results)
          .catch((err) => console.error(err.message));

        setSuggestion(data);
      } else {
        setSuggestion([]);
      }
    };

    fetchMovie();
    document.addEventListener("keydown", detectKeyDown, true);
  }, [title]);

  const detectKeyDown = (e) => {
    if (e.key === "Escape") {
      navigate("/");
      window.location.reload(false);
    }
  };

  const handlePopUp = async ({ detail }, movieId = null) => {
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

  const handleMovie = async (e) => {
    e.preventDefault();

    const collectionId = await axios
      .get(`/api/account/${user._id}`)
      .then(({ data: { owner } }) => owner.movies)
      .catch((err) => console.error(err.message));

    await axios
      .post(`/api/collection/${collectionId}`, {
        ref,
        title,
        genre,
        year,
      })
      .then((res) => res.data)
      .catch((err) => console.error(err.message));

    navigate(`/movies/${encodeSlug(title)}/${year}`);
    window.location.reload(false);
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
                    <p className="mt-2 text-xs lg:text-sm italic text-white/90 text-center">
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
                                    <p className="text-xs lg:text-sm">
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
                                  <p className="text-xs lg:text-sm">
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
                    <p className="mt-1 text-blue-200 font-light text-xs lg:text-sm">
                      {movieToPopUp.tagline}
                    </p>
                  ) : undefined}

                  {movieToPopUp.overview ? (
                    <>
                      <h2 className="mt-2 mb-2 text-left text-lg font-medium">
                        Synopsis
                      </h2>
                      <p className="leading-snug font-light text-xs lg:text-sm text-justify">
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
          <h1 className="mb-6 font-semibold text-2xl text-center text-transparent bg-clip-text bg-gradient-to-t from-blue-800 to-blue-400 dark:from-blue-700 dark:to-blue-400">
            Quel est votre nouveau film ?
          </h1>

          <form onSubmit={handleMovie}>
            <div className="flex flex-col lg:flex-row justify-between">
              <input
                type="text"
                name="ref"
                placeholder="Entrez une référence"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                required
                className="w-max mx-auto mb-2 lg:mb-0 lg:mr-4 px-4 py-1 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 text-blue-400 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner transition-all duration-700 ease-in-out"
              />
              <input
                type="text"
                name="title"
                placeholder="Entrez son titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-max mx-auto px-4 py-1 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 text-blue-400 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner transition-all duration-700 ease-in-out"
              />
            </div>

            {suggestion && suggestion.length > 0 ? (
              <ul
                className={`my-8 w-max truncate m-auto ${
                  suggestion.length === 1
                    ? ""
                    : "grid grid-flow-row lg:grid-flow-col grid-rows-1 lg:grid-cols-2 lg:grid-rows-4 gap-x-20 gap-y-4"
                }`}
              >
                {suggestion
                  .filter((m) => m.poster_path)
                  .slice(0, 8)
                  .map((m) => (
                    <Card
                      key={m.id}
                      onClick={async (e) => {
                        setTitle(m.title);
                        setGenre(m.genre_ids);
                        setYear(new Date(m.release_date).getFullYear());

                        await handlePopUp(e, m.id);
                      }}
                      isClicked={
                        title === m.title &&
                        year === new Date(m.release_date).getFullYear()
                      }
                    >
                      {m}
                    </Card>
                  ))}
              </ul>
            ) : undefined}

            <Submit buttonTitle="Ajouter ce film" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
