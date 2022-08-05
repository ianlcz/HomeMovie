import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import AuthContext from "../../../../auth/AuthContext";
import Submit from "../../../../components/Submit";

const Delete = () => {
  const { user, movies } = useContext(AuthContext);
  const navigate = useNavigate();
  const { reference, title } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setMovie(
      movies.filter((m) =>
        m.ref && m.title
          ? m.ref === reference &&
            m.title.toLowerCase() === decodeURIComponent(title.toLowerCase())
          : undefined,
      )[0],
    );
  }, [movies, title, reference]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(
        `/api/collection/${user.movies._id}/${reference}/${encodeURIComponent(
          title.toLowerCase(),
        )}`,
      )
      .then((res) => res.data)
      .catch((err) => console.error(err.message));

    navigate("/");
    window.location.reload(false);
  };

  return (
    <>
      <Helmet>
        <title>{`Suppression ${
          movie ? "de " + movie.title : "d'un film"
        } | HomeMovie`}</title>
      </Helmet>
      <div className="flex flex-col bg-gradient-to-br from-red-900 to-red-400 min-h-screen">
        <div className="w-5/6 lg:w-auto mx-auto my-auto p-8 bg-red-50 rounded-xl shadow-lg">
          <h1 className="mb-6 font-semibold text-2xl text-center text-red-900">
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
