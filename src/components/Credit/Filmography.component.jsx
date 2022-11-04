import { useEffect, useState } from "react";
import Pane from "./Pane.component";
import Section from "./Section.component";

const Filmography = ({ movies: { cast, crew }, job, gender }) => {
  const [filmography, setFilmography] = useState([
    { title: "Interprétation", movies: undefined, order: undefined },
    { title: "Réalisation", movies: undefined, order: undefined },
    { title: "Son", movies: undefined, order: undefined },
    { title: "Production", movies: undefined, order: undefined },
    { title: "Écriture", movies: undefined, order: undefined },
  ]);

  useEffect(() => {
    setFilmography([
      {
        title: "Interprétation",
        movies:
          cast && job === "Acting"
            ? cast.filter((c) =>
                c.character
                  ? !c.character.toLowerCase().includes("self")
                  : undefined,
              )
            : [],
        order: job === "Acting" ? 0 : job === "Directing" ? 4 : 1,
      },
      {
        title: "Réalisation",
        movies: crew
          ? crew.filter(
              (c) =>
                c.department === "Directing" &&
                c.job === "Director" &&
                c.release_date,
            )
          : undefined,
        order: job === "Acting" ? 1 : job === "Directing" ? 0 : 3,
      },
      {
        title: "Son",
        movies: crew
          ? crew.filter(
              (c) =>
                c.department === "Sound" &&
                (c.job === "Original Music Composer" || c.job === "Music"),
            )
          : undefined,
        order: job === "Acting" ? 4 : job === "Directing" ? 3 : 0,
      },
      {
        title: "Production",
        movies: crew
          ? crew.filter((c) => c.department === "Production")
          : undefined,
        order: job === "Acting" ? 2 : job === "Directing" ? 1 : 2,
      },
      {
        title: "Écriture",
        movies: crew
          ? crew.filter(
              (c) =>
                c.department === "Writing" &&
                (c.job === "Writer" ||
                  c.job === "Characters" ||
                  c.job === "Screenplay"),
            )
          : undefined,
        order: job === "Acting" ? 3 : job === "Directing" ? 2 : 4,
      },
    ]);
  }, [cast, crew]);

  return filmography.every((m) => m.movies)
    ? filmography
        .sort((a, b) => a.order - b.order)
        .map(({ movies, title }, idx) =>
          movies.length > 0 ? (
            <Section key={idx} title={title}>
              <Pane
                movies={movies
                  .filter((m) => m.release_date)
                  .sort(
                    (a, b) =>
                      new Date(b.release_date).getTime() -
                      new Date(a.release_date).getTime(),
                  )}
                gender={gender}
              />
            </Section>
          ) : undefined,
        )
    : null;
};

export default Filmography;
