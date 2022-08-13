import { isMobileOnly } from "react-device-detect";
import Footer from "../../Footer";
import Background from "../Background";
import GoToHome from "./GoToHome";
import Trailer from "./Trailer";

const Pane = ({
  children: {
    detail: {
      ref,
      production_companies,
      belongs_to_collection,
      recommendations,
    },
    cast,
    trailers,
  },
}) => (
  <div
    className={`flex flex-col bg-blue-50 -mt-8 px-4 pt-4 lg:px-14 lg:pt-8 rounded-t-2xl ${
      trailers.length > 0
        ? undefined
        : belongs_to_collection
        ? "lg:min-h-screen"
        : "lg:max-h-screen"
    } z-10 relative`}
  >
    {production_companies ? (
      <>
        <div className="text-blue-600 w-full">
          <h2 className="text-xl text-center font-medium">
            {production_companies.filter((p) => p.logo_path).length > 1
              ? "Sociétés"
              : "Société"}{" "}
            de production
          </h2>
          <ul className="flex flex-row justify-around lg:justify-evenly my-6">
            {production_companies.filter((p) => p.logo_path).length === 0
              ? production_companies.slice(0, 2).map((p) => (
                  <li key={p.id}>
                    <p className="w-max mx-auto text-center text-xs font-medium">
                      {p.name}
                    </p>
                  </li>
                ))
              : production_companies
                  .filter((p) => p.logo_path)
                  .slice(0, 2)
                  .map((p) => (
                    <li key={p.id}>
                      {p.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
                          alt={`Logo de ${p.name}`}
                          className="h-8 mx-auto"
                        />
                      ) : undefined}
                      <p className="w-max mx-auto mt-2 text-center text-xs font-medium">
                        {p.name}
                      </p>
                    </li>
                  ))}
          </ul>

          <h2 className="text-xl mb-4 text-center font-medium">Distribution</h2>

          <ul
            className={`grid grid-flow-dense lg:grid-flow-col grid-cols-1 grid-rows-1 lg:grid-cols-3 lg:grid-rows-3 gap-x-0 gap-y-4 lg:gap-x-4 lg:gap-y-8`}
          >
            {cast
              .filter((p) => p.profile_path)
              .slice(0, isMobileOnly ? 6 : 12)
              .map((c) => (
                <li
                  key={c.id}
                  className="w-fit h-max pr-2 lg:pr-0 hover:bg-blue-100 rounded-xl transition duration-500 ease-in"
                >
                  <a
                    href={`/credits/${c.id}`}
                    className="flex flex-row items-center"
                    title="Voir le profil"
                  >
                    {c.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
                        alt={`Profil de ${c.name}`}
                        className="w-12 h-12 lg:w-16 lg:h-16 md:w-20 md:h-auto object-cover rounded-xl shadow-md"
                      />
                    ) : undefined}
                    <div className="px-2 lg:px-4 py-2">
                      <p className="w-max px-2 shadow-inner text-white text-xs lg:text-sm bg-gradient-to-br from-blue-600 to-blue-400 rounded-full">
                        <span className="font-light">{`${
                          c.name.split(" ")[0]
                        } `}</span>
                        <span className="font-medium">
                          {c.name.split(" ").slice(1).join(" ")}
                        </span>
                      </p>
                      <p className="mt-1 text-left text-xs lg:text-sm">
                        {c.character
                          .split(" / ")
                          .slice(
                            0,
                            c.character.split(" / ").slice(0, 3).join(" / ")
                              .length <= 30
                              ? 3
                              : 2,
                          )
                          .join(" / ")}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
          </ul>

          {trailers.length > 0 ? (
            <>
              <h2 className="text-xl mt-6 mb-4 text-center font-semibold">
                Bande-annonce
              </h2>
              <Trailer>{trailers}</Trailer>
            </>
          ) : undefined}

          {recommendations.length > 0 ? (
            <>
              <h2 className="text-left text-xl mt-6 mb-4 font-medium">
                Recommandations
              </h2>
              <ul className="flex flex-row flex-wrap lg:gap-x-3 gap-y-3 justify-between">
                {recommendations.slice(0, isMobileOnly ? 4 : 6).map((r) => (
                  <li
                    key={r.id}
                    className="hover:scale-110 duration-700 ease-in-out w-[172px] lg:w-52"
                  >
                    <a
                      href={`/movies/${r.title.toLowerCase()}?year=${String(
                        new Date(r.release_date).getFullYear(),
                      )}`}
                      title={r.title}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${r.backdrop_path}`}
                        alt={`Couverture du film ${r.title}`}
                        className="rounded-lg shadow-md hover:shadow-lg duration-700 ease-in-out"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : undefined}

          {belongs_to_collection &&
          belongs_to_collection.name &&
          belongs_to_collection.backdrop_path ? (
            <div className="w-full lg:w-1/2 mx-auto mt-10">
              <Background
                data={{
                  cover: `https://image.tmdb.org/t/p/original/${belongs_to_collection.backdrop_path}`,
                  title: belongs_to_collection.name,
                }}
                isOnPane
              >
                <div className="px-4 flex flex-col text-white">
                  <div className="flex flex-col lg:flex-row flex-wrap gap-x-1 mb-2 lg:mb-2 text-lg lg:text-xl items-center justify-center">
                    <h3 className="font-semibold">
                      Fait partie de la collection
                    </h3>

                    <p className="ml-0.5 font-normal">
                      {belongs_to_collection.name.split(" - ")[0]}
                    </p>
                  </div>

                  <ul className="flex flex-row flex-wrap font-extralight text justify-left">
                    <span className="mr-1">Comprend</span>
                    {belongs_to_collection.parts
                      .sort(
                        (a, b) =>
                          new Date(a.release_date) > new Date(b.release_date),
                      )
                      .map((p, index) => (
                        <li key={p.id}>
                          <a
                            href={`/movies/${p.title.toLowerCase()}?year=${String(
                              new Date(p.release_date).getFullYear(),
                            )}`}
                            className="font-normal hover:text-blue-200 transition duration-700 ease-in-out"
                          >
                            {p.title}
                          </a>
                          {index + 1 < belongs_to_collection.parts.length ? (
                            <span className="mr-1">,</span>
                          ) : undefined}
                        </li>
                      ))}
                  </ul>
                </div>
              </Background>
            </div>
          ) : undefined}

          <div className="flex mt-6">
            <GoToHome />
          </div>
        </div>

        <Footer />
      </>
    ) : undefined}
  </div>
);

export default Pane;
