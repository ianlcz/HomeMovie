import { useContext, useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { IoInformationCircle, IoSyncCircle } from "react-icons/io5";
import AuthContext from "../contexts/auth.context";
import List from "./Movie/List.component";
import Actions from "./Actions.component";
import Suggestions from "./Suggestions.component";

const SearchBar = () => {
  const { user, movies } = useContext(AuthContext);
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [code, setCode] = useState(0);
  //navbar scroll when active state
  const [navbar, setNavbar] = useState(false);

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

  //navbar scroll changeBackground function
  const changeBackground = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 2) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <>
      <div
        className={`flex flex-col lg:flex-row w-full items-center lg:justify-around top-0 py-2 ${
          navbar ? "bg-blue-800/70 dark:bg-blue-800/60" : "bg-blue-800"
        } shadow-lg backdrop-filter backdrop-blur-xl rounded-b-xl lg:rounded-none z-30 fixed`}
      >
        <h1 className="text-2xl text-blue-50 uppercase">
          <span className="font-bold">Home</span>
          <span className="font-thin">Movie</span>
        </h1>

        <div className="flex flex-row items-center justify-evenly w-full lg:w-2/5 my-3 lg:my-0">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Rechercher un film ou une référence"
            className="w-3/5 lg:w-[70%] px-4 py-1 focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 border border-blue-500 text-blue-500 bg-white dark:bg-slate-800 text-xs lg:text-base rounded-full shadow-inner placeholder-blue-400 transition duration-700 ease-in-out"
          />

          <select
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-4 py-1 text-xs lg:text-sm text-blue-400 appearance-none focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 bg-white dark:bg-slate-800 rounded-md border border-blue-500 transition duration-700 ease-in-out"
          >
            <option value={0}>Filtrer</option>
            <option value={1}>Vu</option>
            <option value={3}>Vu au cinéma</option>
            <option value={6}>Vu en streaming</option>
            <option value={4}>Pas vu</option>
            <option value={5}>Souhait</option>
          </select>
        </div>

        <Actions />
      </div>

      <Suggestions result={result} />
    </>
  );
};

export default SearchBar;
