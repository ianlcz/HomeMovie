import { useContext, useEffect, useState } from "react";
import PopUp from "../components/PopUp.component";
import SearchBar from "../components/SearchBar.component";
import PopUpContext from "../contexts/pop-up.context";

const Home = () => {
  const { isShow, movie } = useContext(PopUpContext);

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
