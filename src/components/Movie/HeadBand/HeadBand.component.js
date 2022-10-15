import { isMobileOnly } from "react-device-detect";
import axios from "axios";
import Background from "../Background.component";
import Poster from "../../Poster.component";
import StreamPlatform from "./StreamPlatform.component";
import ReadingTime from "./ReadingTime.component";
import TechnicalTeamSection from "./TechnicalTeamSection.component";
import Score from "./Score.component";

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
}) => (
  <Background
    data={{
      cover: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
      title: title,
    }}
  >
    <div
      className={`flex flex-col lg:flex-row mt-4 mb-14 items-center ${
        poster_path && title ? "justify-around" : "justify-center"
      }`}
    >
      <div className="flex flex-col">
        <Poster>{{ poster_path, title }}</Poster>

        {poster_path ? <StreamPlatform provider={watchProvider} /> : undefined}
      </div>

      <div className="flex flex-col w-full lg:w-3/5 mt-6 lg:mt-0">
        {ref && new Date(release_date).getTime() < new Date().getTime() ? (
          <p className="w-fit mx-auto mb-2 px-2 py-0.5 text-xs text-center font-medium rounded-full shadow bg-gradient-to-tr from-blue-800/90 to-blue-400/80">
            {code === "Vu au cinéma" || code === "Vu en streaming"
              ? code
              : code
              ? `${code} - ${ref}`
              : "Preview"}
          </p>
        ) : undefined}

        <h1 className="flex flex-row w-full items-center justify-center text-center text-white/90 flex-wrap text-2xl lg:text-4xl font-semibold">
          {title}

          {new Date(release_date).getTime() < new Date().getTime() ? (
            <span className="ml-2 lg:ml-4 text-base lg:text-2xl font-light">
              ({new Date(release_date).getFullYear()})
            </span>
          ) : undefined}
        </h1>

        {original_title.toLowerCase() !==
        title.replace(" : ", ": ").replace(" ! ", "! ").toLowerCase() ? (
          <p className="mt-2 text-sm italic text-white/90 text-center">
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
              : new Date(release_date).getTime() < new Date().getTime()
              ? "lg:my-0"
              : "lg:my-4"
          }`}
        >
          {genres && (
            <>
              <ul className="flex flex-row font-light">
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
                        <p className="text-sm">
                          {g.name}
                          {index === genres.length - 1 ? undefined : ", "}
                        </p>
                      </li>
                    ))}
              </ul>

              {runtime > 0 ? (
                <>
                  {genres.length > 0 ? (
                    <p className="mx-2">&bull;</p>
                  ) : undefined}
                  <ReadingTime>{runtime}</ReadingTime>
                </>
              ) : undefined}
            </>
          )}
        </div>

        <TechnicalTeamSection title="Un film de" content={directors} />

        {tagline ? (
          <p className="text-blue-200 font-light text-sm">{tagline}</p>
        ) : undefined}

        {overview ? (
          <>
            <h2 className="text-center lg:text-left text-xl mt-2 mb-2 font-medium">
              Synopsis
            </h2>
            <p className="leading-snug font-light text-sm lg:text-base text-justify">
              {overview}
            </p>
          </>
        ) : undefined}

        <div className="flex flex-row flex-wrap gap-x-4 items-start justify-around">
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
            isReleased: new Date(release_date).getTime() < new Date().getTime(),
          }}
        </Score>
      </div>
    </div>
  </Background>
);

export default HeadBand;
