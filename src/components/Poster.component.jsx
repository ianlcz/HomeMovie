import { useLocation } from "react-router";

const Poster = ({ children: { poster_path, title }, isCenter, onPopUp }) =>
  poster_path ? (
    <a
      href={`https://www.youtube.com/results?search_query=${title}`}
      target="_blank"
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={
          useLocation().pathname.includes("/movies/")
            ? `Affiche du film : ${title}`
            : `Image de : ${title}`
        }
        className={`w-60 ${onPopUp ? "max-w-[10rem] rounded-lg" : "rounded-2xl"} ${
          isCenter ? "mx-auto lg:w-72" : "lg:w-80"
        } object-cover shadow-xl`}
      />
    </a>
  ) : null;

export default Poster;
