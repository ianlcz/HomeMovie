import { IoHome } from "react-icons/io5";

const GoToHome = ({ isCenter }) => (
  <a
    href="/"
    className={`flex flex-row items-center ${
      isCenter ? "w-max" : "mb-6 min-w-max"
    } mx-auto px-3 py-1.5 shadow text-sm bg-gradient-to-tr from-green-800 to-green-400 hover:from-green-400 hover:to-green-800 rounded-full text-green-50`}
  >
    <IoHome className="w-4 h-4" />
    <p className="ml-2.5 font-light">{`Retourner à l'accueil`}</p>
  </a>
);

export default GoToHome;
