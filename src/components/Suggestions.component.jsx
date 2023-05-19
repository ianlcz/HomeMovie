import { useContext } from "react";
import { IoInformationCircle, IoSyncCircle } from "react-icons/io5";
import AuthContext from "../contexts/auth.context";
import List from "./Movie/List.component";

const Suggestions = ({ result }) => {
  const { isLoading } = useContext(AuthContext);

  return (
    <div className="mt-6 mb-[18rem] lg:mb-[178px]">
      {result.length > 0 ? (
        <>
          <ul className=" w-11/12 mx-auto grid grid-flow-cols grid-cols-1 lg:grid-cols-3 lg:gap-x-20 gap-y-3 lg:gap-y-6 items-center">
            {result.map((m) => (
              <List key={m.ref + " " + m.title} movie={m} />
            ))}
          </ul>
        </>
      ) : isLoading ? (
        <div className="flex items-center w-max mx-auto mt-72">
          <IoSyncCircle className="animate-spin w-6 mr-2 h-6 text-blue-600" />
          <p className="text-blue-600 text-xs lg:text-sm font-semibold">
            Récupération de vos films...
          </p>
        </div>
      ) : (
        <div className="flex items-center w-max mx-auto mt-60">
          <IoInformationCircle className="w-6 mr-2 h-6 text-blue-600" />
          <p className="text-blue-600 text-xs lg:text-sm font-semibold">
            {`Nous n'avons pas trouvé de films !`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
