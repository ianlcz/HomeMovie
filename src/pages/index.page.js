import { useEffect, useState } from "react";
import PopUp from "../components/PopUp.component";
import SearchBar from "../components/SearchBar.component";

const Home = () => {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      {showPopUp ? (
        <PopUp
          title="Voulez-vous retirer ce film ?"
          content={
            <>
              <p>
                Cette action va retirer définitivement le film de votre
                collection.
              </p>
              <p className="mt-2">
                Veuillez taper <span className="font-semibold">son titre</span>{" "}
                pour confirmer.
              </p>
            </>
          }
          isShow={showPopUp}
        />
      ) : undefined}
      <div className="flex flex-col w-full bg-blue-50 dark:bg-slate-800 min-h-screen">
        <SearchBar />
      </div>
    </>
  );
};

export default Home;
