import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { getCookieFromBrowser } from "../../../../auth/cookies";
import AuthContext from "../../../../auth/AuthContext";
import Card from "../../../../components/Movie/Card";
import Submit from "../../../../components/Submit";
import jwtDecode from "jwt-decode";

const Update = () => {
  const user = jwtDecode(getCookieFromBrowser("authToken"));
  const { movies } = useContext(AuthContext);
  const navigate = useNavigate();
  const { reference, title } = useParams();
  const [newTitle, setNewTitle] = useState("");
  const [newRef, setNewRef] = useState("");
  const [movie, setMovie] = useState({});
  let [newMovie, setNewMovie] = useState({});
  const [suggestion, setSuggestion] = useState([]);
  const [newCode, setNewCode] = useState(undefined);

  useEffect(() => {
    const fetchMovie = async () => {
      setMovie(
        movies.filter((m) =>
          m.ref && m.title
            ? m.ref === reference &&
              m.title.toLowerCase() === decodeURIComponent(title.toLowerCase())
            : undefined,
        )[0],
      );

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
  }, [movies, reference, title, newTitle]);

  const HandleEdit = async (e) => {
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

      navigate(
        `/movies/${encodeURIComponent(newMovie.title).toLowerCase()}?year=${
          newMovie.year
        }`,
      );
      window.location.reload(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Modification ${
          movie ? "de " + movie.title : "d'un film"
        } | HomeMovie`}</title>
      </Helmet>
      <div className="flex flex-col bg-gradient-to-br from-blue-600 to-blue-400 min-h-screen">
        <div className="w-4/5 lg:w-3/4 mx-auto my-auto p-8 bg-blue-50 rounded-xl shadow-lg">
          <h1 className="mb-6 font-semibold text-2xl text-center text-blue-900">
            Voulez-vous modifier ce film ?
          </h1>
          <form onSubmit={HandleEdit}>
            {movie ? (
              <ul className="my-4">
                <li className="flex flex-row items-center w-max mx-auto px-2 rounded-full text-white bg-gradient-to-br from-blue-600 to-blue-400 truncate">
                  <p className="text-sm font-bold mr-1">{`${movie.ref} -`}</p>
                  <p className="mr-2 text-sm font-semibold">{movie.title}</p>
                  <p className="text-sm">{`(${movie.year})`}</p>
                </li>
              </ul>
            ) : undefined}

            <label className="flex justify-center my-3 text-blue-600 font-medium">
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
                    className="w-full px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
                  />

                  <select
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-max mt-6 px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 appearance-none placeholder-blue-200 font-medium rounded-full shadow-inner"
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
                  className="w-full px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
                />
              </div>
            </div>

            {suggestion && suggestion.length > 0 ? (
              <ul
                className={`my-8 w-max m-auto ${
                  suggestion.length === 1
                    ? ""
                    : "grid grid-flow-col grid-rows-[repeat(8, minmax(0, 1fr))] lg:grid-cols-2 lg:grid-rows-4 gap-8"
                }`}
              >
                {suggestion
                  .filter((m) => m.poster_path)
                  .slice(0, 8)
                  .map((m) => (
                    <Card
                      key={m.id}
                      onClick={() => {
                        setNewTitle(m.title);
                        setNewMovie(m);
                      }}
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
