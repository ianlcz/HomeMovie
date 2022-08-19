import { useEffect, useState } from "react";
import axios from "axios";
import Background from "../Background";

const Collection = ({ movie_title, belongs_to_collection }) => {
  const [collection, setCollection] = useState({});

  useEffect(() => {
    if (belongs_to_collection) {
      belongs_to_collection.parts.map(
        async (m) =>
          (m.directors = await axios
            .get(
              `https://api.themoviedb.org/3/movie/${m.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
            )
            .then(({ data: { crew } }) =>
              crew.filter((c) => c.job === "Director"),
            )
            .catch((err) => console.error(err.message))),
      );

      setCollection(belongs_to_collection);
    }
  }, []);

  return collection.name && collection.backdrop_path ? (
    <div className="w-full lg:w-1/2 mx-auto mt-10">
      <Background
        data={{
          cover: `https://image.tmdb.org/t/p/original/${collection.backdrop_path}`,
          title: collection.name,
        }}
        isOnPane
      >
        <div className="px-4 flex flex-col text-white">
          <div className="flex flex-col lg:flex-row flex-wrap gap-x-1 mb-2 lg:mb-2 text-lg lg:text-xl items-center justify-center">
            <h2 className="font-semibold">Fait partie de la collection</h2>

            <p className="ml-0.5 font-normal">
              {collection.name.split(" - ")[0]}
            </p>
          </div>

          <ul className="flex flex-row flex-wrap font-extralight text-sm justify-left">
            <span className="mr-1">Comprend</span>
            {collection.parts
              .sort(
                (a, b) => new Date(a.release_date) > new Date(b.release_date),
              )
              .map(({ id, title, directors = [], release_date }, idx) => (
                <li key={id}>
                  <a
                    href={
                      directors.length > 0 &&
                      movie_title !== title &&
                      release_date !== ""
                        ? `/movies/${title.toLowerCase()}?year=${String(
                            new Date(release_date).getFullYear(),
                          )}`
                        : undefined
                    }
                    title={
                      directors.length > 0 &&
                      movie_title !== title &&
                      release_date !== ""
                        ? "Voir la fiche du film"
                        : undefined
                    }
                    className={`${
                      movie_title === title
                        ? "font-medium italic"
                        : "font-normal"
                    } ${
                      directors.length > 0 &&
                      movie_title !== title &&
                      release_date !== ""
                        ? "hover:font-medium transition-all duration-700 ease-in-out"
                        : ""
                    }`}
                  >
                    {title}
                  </a>
                  {idx + 1 < collection.parts.length ? (
                    <span className="mr-1">,</span>
                  ) : undefined}
                </li>
              ))}
          </ul>
        </div>
      </Background>
    </div>
  ) : undefined;
};

export default Collection;
