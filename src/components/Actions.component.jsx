import { useContext } from "react";
import { useLocation } from "react-router";
import {
  IoAddCircle,
  IoExit,
  IoSettings,
  IoRemoveCircle,
} from "react-icons/io5";

import AuthContext from "../contexts/auth.context";
import { encodeSlug } from "../utils";
import PopUpContext from "../contexts/pop-up.context";

const Actions = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const { displayMovieOnPopUp } = useContext(PopUpContext);
  const location = useLocation();

  return (
    <>
      {!children ? (
        <div className="flex flex-row items-center justify-around w-full lg:w-[28%]">
          <a
            href="/movies/new"
            className="flex items-center w-max px-2 py-1 text-green-600 hover:text-green-50 border border-green-500 hover:border-green-400 bg-green-50 hover:bg-green-400 rounded-full shadow transition-all duration-300 ease-in-out"
          >
            <IoAddCircle className="lg:w-5 lg:h-5" />
            <span className="ml-2 text-xs lg:text-sm">
              Ajouter un nouveau film
            </span>
          </a>

          <button
            onClick={() => {
              logout();
              window.location.reload(false);
            }}
            className="flex items-center w-max mt-0 px-2 py-1 text-blue-50 bg-gradient-to-br from-blue-800 to-blue-400 border-2 border-blue-50 hover:border-blue-300 rounded-full shadow-inner transition-all duration-500 ease-in-out"
          >
            <IoExit className="lg:w-5 lg:h-5" />
            <span className="ml-2 text-xs lg:text-sm">Me déconnecter</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-row mt-2">
          <a
            href={`/movies/edit/${children.ref}/${encodeSlug(children.title)}`}
            className="flex items-center w-max mr-5 px-2 py-1 text-gray-400 dark:text-gray-300 hover:text-gray-50 border border-gray-400 hover:border-gray-400 bg-gray-50 dark:bg-gray-500/20 hover:bg-gray-400 rounded-full shadow transition-all duration-300 ease-in-out"
          >
            <IoSettings className="w-4 h-4" />
            <span className="ml-2 text-xs">Modifier</span>
          </a>

          <button
            className="flex items-center w-max px-2 py-1 text-red-600 hover:text-red-50 border border-red-500 hover:border-red-400 bg-red-50 dark:bg-red-500/20 hover:bg-red-400 rounded-full shadow transition-all duration-300 ease-in-out"
            onClick={() =>
              displayMovieOnPopUp({
                ref: children.ref,
                title: children.title,
                year: children.year,
              })
            }
          >
            <IoRemoveCircle className="w-4 h-4" />
            <span className="ml-2 text-xs">Retirer</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Actions;
