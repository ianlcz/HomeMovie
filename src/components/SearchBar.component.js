import { useContext, useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { IoInformationCircle, IoSyncCircle } from "react-icons/io5";
import AuthContext from "../auth/AuthContext";
import List from "./Movie/List.component";
import Actions from "./Actions.component";
import Suggestions from "./Suggestions.component";

const SearchBar = () => {
  const { user, movies } = useContext(AuthContext);
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [code, setCode] = useState(0);

  useEffect(() => {
    if (userInput !== "" || code != 0) {
      setTimeout(() => {
        setResult(
          code != 0 && userInput === ""
            ? movies.filter((m) => (m.code ? m.code == code : undefined))
            : userInput !== "" && code != 0
            ? movies.filter((m) =>
                m.ref && m.title && m.code
                  ? (m.title.toLowerCase().includes(userInput.toLowerCase()) ||
                      m.ref.includes(userInput)) &&
                    m.code == code
                  : undefined,
              )
            : movies.filter((m) =>
                m.ref && m.title && m.code
                  ? m.title.toLowerCase().includes(userInput.toLowerCase()) ||
                    m.ref.includes(userInput)
                  : undefined,
              ),
        );
      }, 1000);
    } else {
      setResult(movies);
    }
  }, [userInput, movies, code]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-[96%] items-center mb-0 py-4 lg:pt-5 bottom-0 bg-blue-600/60 shadow-lg backdrop-filter backdrop-blur-2xl rounded-t-2xl z-30 fixed">
          <h1 className="text-2xl text-blue-50 mr-2 uppercase">
            <span className="font-bold">Home</span>
            <span className="font-thin">Movie</span>
          </h1>

          <div className="flex flex-col lg:flex-row items-center w-full lg:w-4/5 mx-auto mt-6 mb-3 justify-evenly">
            <Actions />

            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Rechercher un film ou une référence"
              className="w-[92%] lg:w-5/6 lg:mr-10 mt-4 mb-4 lg:mt-0 lg:mb-0 lg:ml-10 pl-6 h-12 focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 border border-blue-500 text-blue-500 bg-white dark:bg-slate-800 text-sm lg:text-base rounded-full shadow-inner placeholder-blue-400 transition duration-700 ease-in-out"
            />

            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-max mx-auto px-4 py-1 text-sm text-blue-400 appearance-none focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 bg-white dark:bg-slate-800 rounded-md border border-blue-500 transition duration-700 ease-in-out"
            >
              <option value={0}>Filtrer</option>
              <option value={1}>Vu</option>
              <option value={3}>Vu au cinéma</option>
              <option value={6}>Vu en streaming</option>
              <option value={4}>Pas vu</option>
              <option value={5}>Souhait</option>
            </select>
          </div>
        </div>
      </div>

      <Suggestions result={result} />
    </>
  );
};

export default SearchBar;
