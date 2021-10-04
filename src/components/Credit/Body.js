import Filmography from "./Filmography";
import Section from "./Section";
import GoToHome from "../Movie/Pane/GoToHome";
import ReactMarkdown from "react-markdown";
import { isMobileOnly } from "react-device-detect";

const Body = ({
  children: {
    name,
    birthday,
    deathday,
    place_of_birth,
    biography,
    gender,
    known_for_department,
    bestMovies,
    filmography,
  },
}) => (
  <div className="w-full lg:ml-84 mt-6 lg:mt-0 lg:pt-8 text-blue-800">
    {biography ? (
      <Section title="Biographie">
        <p className="leading-snug font-light text-sm lg:text-base text-justify">
          <ReactMarkdown>{biography}</ReactMarkdown>
        </p>
      </Section>
    ) : undefined}

    {bestMovies.length > 0 ? (
      <Section
        title={`${
          gender === 1 ? "Connue" : gender === 2 ? "Connu" : "Connu/e"
        } pour`}
      >
        <ul className="grid grid-flow-col grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-x-6 gap-y-4 lg:gap-x-6 mt-4 items-center">
          {bestMovies.map((m) => (
            <li key={m.id} className="w-full">
              <a
                href={`/movie/${m.title.toLowerCase()}?year=${String(
                  new Date(m.release_date).getFullYear()
                )}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
                  alt={`Affiche du film : ${m.title}`}
                  className="w-full object-cover rounded-xl shadow-xl"
                />
                <p className="w-full mx-auto mt-2 px-4 truncate text-center text-sm font-medium text-white bg-gradient-to-br from-blue-800 to-blue-400 rounded-full">
                  {m.character}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    ) : undefined}

    <Filmography
      movies={filmography}
      job={known_for_department}
      gender={gender}
    />

    {isMobileOnly ? <GoToHome isCenter /> : undefined}
  </div>
);

export default Body;
