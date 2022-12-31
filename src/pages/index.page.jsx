import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import PopUp from "../components/PopUp.component";
import SearchBar from "../components/SearchBar.component";
import AuthContext from "../contexts/auth.context";
import PopUpContext from "../contexts/pop-up.context";
import { encodeSlug } from "../utils";
import { useEffect } from "react";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { isShow, closePopUp, movie } = useContext(PopUpContext);
  const navigate = useNavigate();
  const [movieTitleEnteredByUser, setMovieTitleEnteredByUser] = useState("");

  const isDisabled =
    movieTitleEnteredByUser !== `${movie.ref} - ${movie.title} (${movie.year})`;

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === "Escape") {
      closePopUp();
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const collectionId = await axios
      .get(`/api/account/${user._id}`)
      .then(({ data: { owner } }) => owner.movies)
      .catch((err) => console.error(err.message));

    await axios
      .delete(`/api/collection/${collectionId}/${movie.ref}/${movie.title}`)
      .then((res) => res.data)
      .catch((err) => console.error(err.message));

    navigate("/");
    window.location.reload(false);
  };

  return (
    <>
      {isShow ? (
        <PopUp
          title="Voulez-vous retirer ce film ?"
          content={
            <>
              <p>
                Cette action <strong>ne peut pas</strong> être annulée. Elle va
                retirer définitivement le film de votre collection.
              </p>
              <p className="mt-2.5">
                Veuillez taper{" "}
                <span className="px-2 py-0.5 font-medium rounded-full text-white bg-gradient-to-br from-blue-800 to-blue-400 truncate">
                  {`${movie.ref} - ${movie.title} (${movie.year})`}
                </span>{" "}
                pour confirmer.
              </p>

              <form onSubmit={handleDelete}>
                <input
                  type="text"
                  value={movieTitleEnteredByUser}
                  onChange={(e) => setMovieTitleEnteredByUser(e.target.value)}
                  autoFocus
                  className="flex w-full lg:w-[72%] mx-auto mt-4 mb-4 px-2 py-1 text-center border border-blue-500 placeholder:text-blue-300 placeholder:font-light rounded-md focus:outline-none focus:ring-2 focus:dark:ring-1 text-blue-400 focus:ring-blue-500 bg-white dark:bg-slate-800 text-sm lg:text-base"
                />

                <button
                  type="submit"
                  className={`flex justify-center w-full mx-auto py-1 text-sm lg:text-base font-medium rounded-lg ${
                    isDisabled
                      ? "text-red-200 border border-red-200 cursor-default"
                      : "text-red-400 hover:text-white border border-red-200 bg-red-50 hover:bg-red-500"
                  }`}
                >
                  Je comprends les conséquences, retirez ce film de ma
                  collection
                </button>
              </form>
            </>
          }
          isShow
        />
      ) : undefined}
      <div className="flex flex-col w-full bg-blue-50 dark:bg-slate-800 min-h-screen">
        <SearchBar />
      </div>
    </>
  );
};

export default Home;
