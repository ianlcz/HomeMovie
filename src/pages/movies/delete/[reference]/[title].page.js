import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import AuthContext from "../../../../auth/AuthContext";
import Submit from "../../../../components/Submit.component";
import { decodeSlug, encodeSlug } from "../../../../utils";
import { Helmet } from "react-helmet";

const Delete = () => {
  const { user, movies } = useContext(AuthContext);
  const navigate = useNavigate();
  const { reference, title } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setMovie(
      movies.find((m) =>
        m.ref && m.title
          ? m.ref === reference &&
            decodeSlug(encodeSlug(m.title)) === decodeSlug(title)
          : undefined,
      ),
    );

    document.title =
      `Suppression ${movie ? "de " + movie.title : "d'un film"} | HomeMovie` ||
      "";
  }, [movies, title, reference]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(
        `/api/collection/${user.movies._id}/${reference}/${encodeSlug(title)}`,
      )
      .then((res) => res.data)
      .catch((err) => console.error(err.message));

    navigate("/");
    window.location.reload(false);
  };

  return (
    <>
      <Helmet
        meta={[
          {
            name: `theme-color`,
            content: "#7f1d1d",
          },
        ]}
      >
        >
      </Helmet>
      <div className="flex flex-col bg-red-100 dark:bg-slate-800 min-h-screen">
        <div className="w-5/6 lg:w-auto mx-auto my-auto p-8 bg-white dark:bg-slate-600 rounded-xl shadow-lg">
          <h1 className="mb-6 font-semibold text-2xl text-center text-red-800 dark:text-red-500">
            Voulez-vous retirer ce film ?
          </h1>
          <form onSubmit={handleDelete}>
            {movie ? (
              <ul className="my-4">
                <li className="flex flex-row items-center w-max mx-auto px-2 rounded-full text-white bg-gradient-to-br from-red-800 to-red-400 truncate">
                  <p className="text-sm font-bold mr-1">{`${movie.ref} -`}</p>
                  <p className="mr-2 text-sm font-semibold">{movie.title}</p>
                  <p className="text-sm">{`(${movie.year})`}</p>
                </li>
              </ul>
            ) : undefined}

            <Submit buttonTitle="Oui" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Delete;
