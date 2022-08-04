import { isMobileOnly } from "react-device-detect";
import { SiPrimevideo, SiNetflix, SiAppletv, SiDiscord } from "react-icons/si";
import Background from "../Background";
import ReadingTime from "./ReadingTime";
import Section from "./Section";
import Score from "./Score";
import Poster from "../../Poster";
import { useEffect, useState } from "react";
import axios from "axios";

const HeadBand = ({
  children: {
    detail: {
      id,
      ref,
      backdrop_path,
      original_title,
      title,
      overview,
      tagline,
      production_companies,
      genres,
      runtime,
      poster_path,
      vote_average,
      budget,
      revenue,
      release_date,
    },
    directors,
    compositors,
  },
}) => {
  const [streamPlatfom, setStreamPlatform] = useState(undefined);
  const streamConfig = {
    "Amazon Prime Video": {
      icon: <SiPrimevideo size={50} />,
      color: "bg-blue-500",
    },
    "Apple TV Plus": { icon: <SiAppletv size={40} />, color: "bg-gray-900" },
    Netflix: { icon: <SiNetflix size={28} />, color: "bg-red-600" },
  };

  useEffect(() => {
    const fetchStream = async () => {
      const {
        FR: { flatrate },
      } = await axios
        .get(
          `https://api.themoviedb.org/3/movies/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`,
        )
        .then((res) => res.data.results)
        .catch((err) => console.error(err.message));

      setStreamPlatform(flatrate ? flatrate[0] : undefined);
    };
    fetchStream();
  }, []);

  return directors.length !== 0 ? (
    <Background
      data={{
        cover: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
        title: title,
      }}
    >
      <div className="flex flex-col lg:flex-row mt-4 mb-14 items-center justify-around">
        <div className="flex flex-col">
          <Poster>{{ poster_path, title }}</Poster>

          {streamPlatfom && streamConfig[streamPlatfom.provider_name] ? (
            <div
              className={`hidden lg:flex flex-row justify-evenly items-center rounded-full w-11/12 mx-auto shadow-md cursor-default mt-4 ${
                streamPlatfom.provider_name === "Netflix"
                  ? "py-2"
                  : streamPlatfom.provider_name === "Apple TV Plus"
                  ? "py-1"
                  : "py-0"
              } ${streamConfig[streamPlatfom.provider_name].color}`}
            >
              {streamConfig[streamPlatfom.provider_name].icon}
              <div className="flex flex-col text-sm leading-tight">
                <h4 className="font-light">Disponible en streaming</h4>
                <h3 className="font-semibold">Regardez maintenant</h3>
              </div>
            </div>
          ) : undefined}
        </div>

        <div className="flex flex-col w-full lg:w-3/5 mt-6 lg:mt-0">
          {ref && new Date(release_date).getTime() < new Date().getTime() ? (
            <p className="w-16 mx-auto mb-2 px-2 py-0.5 text-xs text-center font-medium rounded-full shadow bg-gradient-to-tr from-blue-600 to-blue-400">
              {ref}
            </p>
          ) : undefined}

          <h1 className="flex flex-row w-full items-center justify-center text-center flex-wrap text-2xl lg:text-4xl font-semibold">
            {title}

            {new Date(release_date).getTime() < new Date().getTime() ? (
              <span className="ml-2 lg:ml-4 text-base lg:text-2xl font-light">
                ({new Date(release_date).getFullYear()})
              </span>
            ) : undefined}
          </h1>

          {original_title.toLowerCase() !== title.toLowerCase() ? (
            <p className="mt-2 text-sm italic text-center">{original_title}</p>
          ) : undefined}

          {new Date(release_date).getTime() > new Date().getTime() ? (
            <span className="w-max mx-auto mt-3 lg:mt-4 text-xs lg:text-xs font-bold uppercase">
              Le{" "}
              {new Date(release_date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              au cinéma
            </span>
          ) : undefined}

          <div className="flex flex-row items-center lg:w-max mx-auto mt-2 lg:my-4">
            {genres && (
              <>
                <ul className="flex flex-row">
                  {isMobileOnly
                    ? genres.slice(0, 2).map((g, index) => (
                        <li
                          key={g.name}
                          className={`ml-1 ${
                            index === 1 ? "lg:truncate" : undefined
                          }`}
                        >
                          <p className="text-sm lg:text-base">
                            {g.name}
                            {index === 1 ? undefined : ", "}
                          </p>
                        </li>
                      ))
                    : genres.map((g, index) => (
                        <li
                          key={g.name}
                          className={`ml-1 ${
                            index === genres.length - 1
                              ? "lg:truncate"
                              : undefined
                          }`}
                        >
                          <p className="text-sm lg:text-base">
                            {g.name}
                            {index === genres.length - 1 ? undefined : ", "}
                          </p>
                        </li>
                      ))}
                </ul>

                {runtime > 0 ? (
                  <>
                    <p className="mx-2">&bull;</p>
                    <ReadingTime>{runtime}</ReadingTime>
                  </>
                ) : undefined}
              </>
            )}
          </div>

          <Section title="Un film de" content={directors} />

          {tagline ? (
            <p className="mb-2 text-blue-100 font-light text-sm">{tagline}</p>
          ) : undefined}

          {overview ? (
            <>
              <h2 className="text-center lg:text-left text-xl mb-2 font-medium">
                Synopsis
              </h2>
              <p className="leading-snug font-light text-sm lg:text-base text-justify">
                {overview}
              </p>
            </>
          ) : undefined}

          <Section title="Bande originale de" content={compositors} />

          <Score>{{ vote_average, budget, revenue }}</Score>
        </div>
      </div>
    </Background>
  ) : null;
};

export default HeadBand;
