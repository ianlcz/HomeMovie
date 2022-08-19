import { isMobileOnly } from "react-device-detect";
import Collection from "./Collection";
import GoToHome from "./GoToHome";
import Footer from "../../Footer";

const Pane = ({
  children: {
    detail: {
      ref,
      title,
      production_companies,
      belongs_to_collection,
      recommendations,
    },
    cast,
    trailers,
  },
}) => {
  const PaneItems = [
    {
      title: {
        text: `${
          production_companies.filter((p) => p.logo_path).slice(0, 4).length > 1
            ? "Sociétés"
            : "Société"
        } de production`,
        options: "text-center",
      },
      body: {
        verify:
          production_companies.filter((p) => p.logo_path).slice(0, 4).length >
          0,
        content:
          production_companies.filter((p) => p.logo_path).slice(0, 4).length >
          0 ? (
            <ul className="flex flex-row flex-wrap gap-4 items-center justify-around lg:justify-evenly my-6">
              {production_companies.filter((p) => p.logo_path).slice(0, 4)
                .length === 0
                ? production_companies
                    .filter((p) => p.logo_path)
                    .slice(0, 4)
                    .map((p) => (
                      <li key={p.id}>
                        <p className="w-max mx-auto text-center text-xs font-medium">
                          {p.name}
                        </p>
                      </li>
                    ))
                : production_companies
                    .filter((p) => p.logo_path)
                    .slice(0, 4)
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
          ) : undefined,
      },
    },
    {
      title: { text: "Distribution", options: "mb-4 text-center" },
      body: {
        verify:
          cast.filter((p) => p.profile_path).slice(0, isMobileOnly ? 6 : 12)
            .length > 0,
        content:
          cast.filter((p) => p.profile_path).slice(0, isMobileOnly ? 6 : 12)
            .length > 0 ? (
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
          ) : undefined,
      },
    },
    {
      title: { text: "Bande-annonce", options: "mt-6 mb-4 text-center" },
      body: {
        verify: trailers.length > 0,
        content:
          trailers.length > 0 ? (
            <div className="aspect-w-16 aspect-h-[9.4] rounded-xl">
              <iframe
                className="rounded-xl shadow-lg"
                src={`https://www.youtube.com/embed/${
                  trailers[
                    Math.floor(Math.random() * Math.floor(trailers.length))
                  ].key
                }`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : undefined,
      },
    },
    {
      title: { text: "Recommandations", options: "mt-6 mb-4 text-left" },
      body: {
        verify: recommendations.length > 0,
        content:
          recommendations.length > 0 ? (
            <ul className="flex flex-row flex-wrap lg:gap-x-3 gap-y-3 justify-between">
              {recommendations.slice(0, isMobileOnly ? 4 : 6).map((r) => (
                <li
                  key={r.id}
                  className="hover:scale-110 duration-700 ease-in-out w-[172px] lg:w-[204px] 2xl:w-[280px]"
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
          ) : undefined,
      },
    },
  ];

  return (
    <div
      className={`flex flex-col bg-blue-50 w-full -mt-8 px-4 pt-4 lg:px-14 lg:pt-8 rounded-t-2xl ${
        trailers.length > 0
          ? undefined
          : belongs_to_collection
          ? "lg:min-h-screen"
          : "lg:max-h-screen"
      } text-blue-600 z-10 relative`}
    >
      {PaneItems.map(
        ({ title: { text, options }, body: { verify, content } }, idx) =>
          verify ? (
            <span key={idx}>
              <h2 className={`${options} text-xl font-medium`}>{text}</h2>
              {content}
            </span>
          ) : undefined,
      )}

      <Collection
        movie_title={title}
        belongs_to_collection={belongs_to_collection}
      />

      <div className="flex mt-6">
        <GoToHome />
      </div>

      <Footer />
    </div>
  );
};

export default Pane;
