import { useLocation } from "react-router";

const Poster = ({ children: { poster_path, title }, isCenter }) =>
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
        className={`w-60 ${
          isCenter ? "mx-auto lg:w-72" : "lg:w-80"
        } object-cover rounded-xl shadow-xl`}
      />
    </a>
  ) : null;

export default Poster;
