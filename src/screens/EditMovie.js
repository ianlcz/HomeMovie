import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../auth/AuthContext";
import { getCookieFromBrowser } from "../auth/cookies";
import Card from "../components/Movie/Card";
import Submit from "../components/Submit";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet";

const EditMovie = () => {
  const user = jwtDecode(getCookieFromBrowser("authToken"));
  const { movies } = useContext(AuthContext);
  const history = useHistory();
  const [userInput, setUserInput] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newRef, setNewRef] = useState("");
  const [movie, setMovie] = useState({});
  const [newMovie, setNewMovie] = useState(undefined);
  const [suggestion, setSuggestion] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState([]);

  const API_KEY = "aeeca3eb934c595a32cbd53a16f76f64";

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = movies.filter((m) =>
        m.ref && m.title
          ? m.title.toLowerCase().match(userInput.toLowerCase()) ||
            m.ref.includes(userInput)
          : undefined
      );

      if (userInput !== "") {
        setSuggestion(movie);
      } else {
        setSuggestion([]);
      }

      if (newTitle !== "") {
        const data = await axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${newTitle.trim()}&api_key=${API_KEY}&language=fr-FR`
          )
          .then((res) => res.data.results)
          .catch((err) => console.error(err.message));

        setNewSuggestion(data);
      } else {
        setNewSuggestion([]);
      }
    };
    fetchMovie();
  }, [userInput, newTitle]);

  const HandleEdit = async (e) => {
    e.preventDefault();
    const today = new Date();

    if (user) {
      await axios
        .put(`/api/collection/${user.movies}`, {
          movie,
          newMovie: !newMovie
            ? {
                ref: newRef === "" ? movie.ref : newRef,
                title: movie.title,
                genre: movie.genre,
                code: 1,
                purchaseYear: movie.purchaseYear,
                year: movie.year,
              }
            : {
                ref: newRef === "" ? movie.ref : newRef,
                title: newMovie.title,
                genre: newMovie.genre_ids,
                code: 1,
                purchaseYear: movie.purchaseYear,
                year: new Date(newMovie.release_date).getFullYear(),
              },
        })
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      history.push("/");
      window.location.reload(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Modification d'un film | Movie House`}</title>
      </Helmet>
      <div className="flex flex-col bg-gradient-to-br from-blue-900 to-blue-400 min-h-screen">
        <div className="w-auto mx-auto my-auto p-8 bg-blue-50 rounded-xl shadow-lg">
          <h1 className="mb-6 font-semibold text-2xl text-center text-blue-900">
            Quel film souhaitez-vous modifier ?
          </h1>
          <form onSubmit={HandleEdit}>
            <input
              type="text"
              name="userInput"
              placeholder="Entrez son titre ou sa référence"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              required
              className="w-full px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
            />

            {suggestion && suggestion.length > 0 ? (
              <ul
                className={`my-8 ${
                  suggestion.length === 1
                    ? ""
                    : "grid grid-flow-col grid-cols-2 grid-rows-2 gap-8"
                }`}
              >
                {suggestion.slice(0, 4).map((m) => (
                  <li
                    onClick={() => {
                      setMovie(m);
                      setUserInput(`${m.ref} - ${m.title} (${m.year})`);
                    }}
                    className="flex flex-row items-center w-max mx-auto px-2 rounded-full text-white bg-gradient-to-br from-blue-800 to-blue-400 truncate cursor-pointer"
                  >
                    <p className="text-sm font-bold mr-1">{`${m.ref} -`}</p>
                    <p className="mr-2 text-sm font-semibold">{m.title}</p>
                    <p className="text-sm">{`(${m.year})`}</p>
                  </li>
                ))}
              </ul>
            ) : undefined}

            <label className="flex justify-center my-3 text-blue-800 font-medium">
              par
            </label>

            <div className="flex flex-row items-center">
              <input
                type="text"
                name="newRef"
                placeholder="Nouvelle référence"
                value={newRef}
                onChange={(e) => setNewRef(e.target.value)}
                className="w-full px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
              />

              <label className="flex mx-4 text-blue-500 text-sm">et/ou</label>

              <input
                type="text"
                name="newTitle"
                placeholder="Nouveau titre"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
              />
            </div>

            {newSuggestion && newSuggestion.length > 0 ? (
              <ul
                className={`my-8 w-max m-auto ${
                  newSuggestion.length === 1
                    ? ""
                    : "grid grid-flow-col grid-cols-2 grid-rows-2 gap-8"
                }`}
              >
                {newSuggestion
                  .filter((m) => m.poster_path)
                  .slice(0, 4)
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

            <Submit buttonTitle="Modifier ce film" />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMovie;