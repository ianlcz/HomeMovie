import { isMobileOnly } from "react-device-detect";
import axios from "axios";
import Background from "../Background.component";
import Poster from "../../Poster.component";
import StreamPlatform from "./StreamPlatform.component";
import TechnicalTeamSection from "./TechnicalTeamSection.component";
import Score from "./Score.component";
import GenreHeadBand from "./GenreHeadBand.component";

const HeadBand = ({
  children: {
    detail: {
      id,
      ref,
      code,
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
      watchProvider,
    },
    directors,
    compositors,
    charactersCreators,
  },
}) => {
  const movieRef =
    code === "Vu en streaming" ||
    (code === "Vu au cinéma" && ref === "8000") ||
    (code === "Pas vu" && ref === "8000") ? (
      code
    ) : code ? (
      <>
        {ref} — <span className="font-extralight">{code}</span>
      </>
    ) : (
      "Preview"
    );

  return (
    <Background
      data={{
        cover: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
        title: title,
      }}
    >
      <div
        className={`flex flex-col lg:flex-row items-center ${
          poster_path && title ? "justify-evenly" : "justify-center"
        }`}
      >
        <div className="flex flex-col">
          <Poster>{{ poster_path, title }}</Poster>

          {poster_path ? (
            <StreamPlatform provider={watchProvider} />
          ) : undefined}
        </div>

        <div className="flex flex-col w-full lg:w-[66%] mt-6 lg:mt-0">
          {ref && new Date(release_date).getTime() < new Date().getTime() ? (
            <p className="w-fit mx-auto mb-2 px-2 py-0.5 text-xs text-center font-medium rounded-full shadow bg-gradient-to-tr from-blue-800/90 to-blue-400/80">
              {movieRef}
            </p>
          ) : undefined}

          <h1 className="flex flex-row w-full items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-b lg:bg-gradient-to-r from-white/90 to-white/70 flex-wrap text-2xl lg:text-4xl font-semibold">
            {title}

            {new Date(release_date).getTime() < new Date().getTime() ? (
              <span className="ml-2 text-base lg:text-2xl font-light">
                ({new Date(release_date).getFullYear()})
              </span>
            ) : undefined}
          </h1>

          {original_title.toLowerCase() !==
          title.replace(" : ", ": ").replace(" ! ", "! ").toLowerCase() ? (
            <p className="mt-2 text-xs lg:text-sm italic text-white/90 text-center">
              {original_title}
            </p>
          ) : undefined}

          {new Date(release_date).getTime() > new Date().getTime() ? (
            <span className="w-max mx-auto mt-3 lg:mt-6 text-xs lg:text-xs font-bold uppercase">
              Le{" "}
              {new Date(release_date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              au cinéma
            </span>
          ) : undefined}

          <div
            className={`flex flex-row items-center lg:w-max mx-auto mt-2 ${
              original_title.toLowerCase() ===
                title.replace(" : ", ": ").replace(" ! ", "! ").toLowerCase() &&
              new Date(release_date).getTime() < new Date().getTime()
                ? "lg:-my-1"
                : runtime && runtime > 0
                ? "lg:my-0"
                : "lg:my-4"
            }`}
          >
            {genres && <GenreHeadBand genres={genres} runtime={runtime} />}
          </div>

          <TechnicalTeamSection title="Un film de" content={directors} />

          {tagline ? (
            <p className="text-blue-200 font-light lg:font-extralight text-xs lg:text-sm">
              {tagline}
            </p>
          ) : undefined}

          {overview ? (
            <>
              <h2 className="text-center lg:text-left text-xl mt-2 mb-2 font-medium">
                Synopsis
              </h2>
              <p className="leading-snug font-light text-xs lg:text-base text-justify">
                {overview}
              </p>
            </>
          ) : undefined}

          <div className="flex flex-row flex-wrap gap-x-4 items-start justify-around mb-2">
            <TechnicalTeamSection
              title="D'après les personnages créés par"
              content={charactersCreators}
            />

            <TechnicalTeamSection
              title="Bande originale de"
              content={compositors}
            />
          </div>

          <Score>
            {{
              vote_average,
              budget,
              revenue,
              isReleased:
                new Date(release_date).getTime() < new Date().getTime(),
            }}
          </Score>
        </div>
      </div>
    </Background>
  );
};

export default HeadBand;
