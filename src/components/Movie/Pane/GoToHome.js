import { IoHome } from "react-icons/io5";

const GoToHome = () => (
  <a
    href="/"
    className="flex flex-row items-center min-w-max mx-auto mb-6 mb:mb-0 px-3 py-1.5 shadow text-sm bg-gradient-to-tr from-blue-800 to-blue-400 hover:from-blue-400 hover:to-blue-800 rounded-full text-blue-50"
  >
    <IoHome className="w-4 h-4" />
    <p className="ml-2.5 font-light">{`Retourner à l'accueil`}</p>
  </a>
);

export default GoToHome;
