import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Movie/Card.component";
import Submit from "../../components/Submit.component";
import { encodeSlug } from "../../utils";

const Create = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ref, setRef] = useState("");
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [genre, setGenre] = useState([]);
  const [year, setYear] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
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

    document.title = `Ajout d'un nouveau film | HomeMovie` || "";

    fetchMovie();
  }, [title]);

  const handleMovie = async (e) => {
    e.preventDefault();

    if (user) {
      await axios
        .post(`/api/collection/${user.movies._id}`, {
          ref,
          title,
          genre,
          year,
        })
        .then((res) => res.data)
        .catch((err) => console.error(err.message));

      navigate(`/movies/${encodeSlug(title)}/${year}`);
      window.location.reload(false);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-blue-100 dark:bg-slate-800 min-h-screen">
        <div className="w-4/5 lg:w-3/4 mx-auto my-auto p-8 bg-white dark:bg-slate-600 rounded-xl shadow-lg">
          <h1 className="mb-6 font-semibold text-2xl text-center text-blue-800 dark:text-blue-500">
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
                className="w-max mx-auto mb-2 lg:mb-0 px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 text-blue-400 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner transition-all duration-700 ease-in-out"
              />
              <input
                type="text"
                name="title"
                placeholder="Entrez son titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-max mx-auto px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 text-blue-400 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner transition-all duration-700 ease-in-out"
              />
            </div>

            {suggestion && suggestion.length > 0 ? (
              <ul
                className={`my-8 w-max m-auto ${
                  suggestion.length === 1
                    ? ""
                    : "grid grid-flow-col grid-rows-8 lg:grid-cols-2 lg:grid-rows-4 gap-x-20 gap-y-4"
                }`}
              >
                {suggestion
                  .filter((m) => m.poster_path)
                  .slice(0, 8)
                  .map((m) => (
                    <Card
                      key={m.id}
                      onClick={() => {
                        setTitle(m.title);
                        setGenre(m.genre_ids);
                        setYear(new Date(m.release_date).getFullYear());
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
