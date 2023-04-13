import { useEffect, useState } from "react";
import axios from "axios";
import Background from "../Background.component";
import { encodeSlug } from "../../../utils";

const Collection = ({ movie_title, belongs_to_collection }) =>
  belongs_to_collection &&
  belongs_to_collection.name &&
  belongs_to_collection.backdrop_path &&
  belongs_to_collection.parts.length > 1 ? (
    <div className="w-full lg:w-1/2 mx-auto mt-4 lg:mt-8">
      <Background
        data={{
          cover: `https://image.tmdb.org/t/p/original/${belongs_to_collection.backdrop_path}`,
          title: belongs_to_collection.name,
        }}
        onPane
      >
        <div className="px-4 flex flex-col text-slate-50">
          <div className="flex flex-col lg:flex-row flex-wrap gap-x-1 mb-2 lg:mb-2 text-lg lg:text-xl items-center justify-center">
            <h2 className="font-semibold">Fait partie de la collection</h2>

            <p className="ml-0.5 font-normal">
              {belongs_to_collection.name.split(" - ")[0]}
            </p>
          </div>

          <ul className="flex flex-row flex-wrap font-extralight text-xs lg:text-sm justify-left">
            <span className="mr-1">Comprend</span>
            {belongs_to_collection.parts
              .sort(
                (a, b) => new Date(a.release_date) - new Date(b.release_date),
              )
              .map(({ id, title, release_date }, idx) => (
                <li key={id}>
                  <a
                    href={
                      movie_title !== title && release_date !== ""
                        ? `/movies/${encodeSlug(title)}/${String(
                            new Date(release_date).getFullYear(),
                          )}`
                        : undefined
                    }
                    title={
                      movie_title !== title && release_date !== ""
                        ? "Voir la fiche du film"
                        : undefined
                    }
                    className={`${
                      movie_title === title
                        ? "font-medium italic"
                        : "font-normal"
                    } ${
                      movie_title !== title && release_date !== ""
                        ? "hover:font-medium transition-all duration-700 ease-in-out"
                        : ""
                    }`}
                  >
                    {title}
                  </a>
                  <span className="mr-1">
                    {idx + 2 < belongs_to_collection.parts.length
                      ? ","
                      : idx + 1 == belongs_to_collection.parts.length
                      ? undefined
                      : " et"}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </Background>
    </div>
  ) : undefined;

export default Collection;
