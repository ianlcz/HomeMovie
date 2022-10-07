import { encodeSlug } from "../../utils";
import Actions from "../Actions.component";

const List = ({ movie }) => {
  const codeEquivalent = [
    { code: 1, label: "Vu" },
    { code: 3, label: "Vu au cinéma" },
    { code: 4, label: "Pas vu" },
    { code: 5, label: "Souhait" },
    { code: 6, label: "Vu en streaming" },
  ];

  return movie.title ? (
    <li className="pl-4 pr-2 py-2 rounded-xl text-blue-600 dark:text-blue-500 hover:dark:text-blue-800 hover:bg-blue-100 hover:dark:bg-blue-100/80 transition-all duration-500 ease-in-out">
      <a
        href={`/movies/${encodeSlug(movie.title)}/${movie.year}`}
        className="flex flex-row items-center mb-2"
      >
        <p className="flex items-center justify-center w-16 h-6 mr-4 shadow-inner bg-gradient-to-br from-blue-800 to-blue-400 text-white text-center text-sm font-semibold rounded-xl">
          {movie.ref}
        </p>
        <div>
          <p className="font-light">
            {movie.title}
            {movie.year ? (
              <span className="ml-1 font-medium text-sm">{`(${movie.year})`}</span>
            ) : undefined}
          </p>
          <p className="w-max mt-1 px-2 rounded text-white text-xs bg-blue-400">
            {codeEquivalent.find((c) => c.code === movie.code)
              ? codeEquivalent.find((c) => c.code === movie.code).label
              : undefined}
          </p>
          <Actions>{{ title: movie.title, ref: movie.ref }}</Actions>
        </div>
      </a>
    </li>
  ) : undefined;
};

export default List;
