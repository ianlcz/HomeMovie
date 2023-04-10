import { isMobileOnly } from "react-device-detect";
import { IoInformationCircle } from "react-icons/io5";
import Background from "../Background.component";
import Collection from "./Collection.component";
import GoToHome from "./GoToHome.component";
import Footer from "../../../layouts/footer.layout";
import { encodeSlug, formatName } from "../../../utils";

const Pane = ({
  children: {
    detail: {
      ref,
      title,
      backdrop_path,
      production_companies,
      belongs_to_collection,
      recommendations,
    },
    cast,
    trailer,
  },
}) => {
  const isHover = false;
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
                        <p className="w-max mx-auto mt-2 text-center text-xs font-extralight">
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
        verify: true,
        content:
          cast.filter((p) => p.profile_path).slice(0, isMobileOnly ? 6 : 12)
            .length > 0 ? (
            <ul
              className={`grid grid-flow-dense lg:grid-flow-col grid-cols-1 grid-rows-1 lg:grid-cols-3 lg:grid-rows-3 gap-x-0 gap-y-4 lg:gap-x-4 lg:gap-y-8 z-50`}
            >
              {cast
                .filter((p) => p.profile_path)
                .slice(0, isMobileOnly ? 6 : 12)
                .map((c) => (
                  <li
                    key={c.id}
                    className="w-fit h-max pr-2 lg:pr-0 hover:bg-blue-600/10 dark:hover:bg-blue-200/80 dark:text-blue-500 hover:dark:text-blue-800 rounded-xl transition duration-500 ease-in"
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
                        <p className="w-max px-2 shadow-inner text-white text-xs lg:text-sm bg-gradient-to-br from-blue-800 to-blue-400 rounded-full">
                          <span className="font-light">
                            {formatName(c.name).firstname}
                          </span>
                          <span className="font-semibold">
                            {formatName(c.name).lastname}
                          </span>
                        </p>
                        <p className="mt-1.5 text-left text-xs lg:text-sm font-extralight">
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
          ) : (
            <div className="flex flex-row items-center justify-center text-blue-600">
              <IoInformationCircle size={"20px"} />
              <p className="ml-1 font-light text-xs lg:text-sm">
                Aucune distribution est disponible pour l'instant
              </p>
            </div>
          ),
      },
    },
    {
      title: { text: "Bande-annonce", options: "mt-6 mb-4 text-center" },
      body: {
        verify: trailer,
        content: trailer ? (
          <div className="aspect-w-16 aspect-h-[9.4] lg:aspect-w-[10] lg:aspect-h-[5.64] rounded-2xl">
            <iframe
              className="rounded-2xl shadow-lg"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              frameBorder="0"
              allowFullScreen={false}
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
            <ul className="flex flex-row flex-wrap justify-between gap-y-3 lg:gap-x-4 lg:gap-y-0">
              {recommendations.slice(0, isMobileOnly ? 4 : 6).map((r) => (
                <li
                  key={r.id}
                  className="hover:scale-110 lg:hover:scale-125 duration-700 ease-in-out w-[172px] lg:w-[194px] 2xl:w-[280px]"
                >
                  <a
                    href={`/movies/${encodeSlug(r.title)}/${String(
                      new Date(r.release_date).getFullYear(),
                    )}`}
                    title={r.title}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original/${r.backdrop_path}`}
                      alt={`Couverture du film ${r.title}`}
                      className="rounded-lg shadow-md hover:shadow-xl duration-700 ease-in-out"
                    />

                    {r.vote_average ? (
                      <div className="flex flex-row items-start justify-evenly mt-2 text-xs lg:text-sm">
                        <h3 className="font-medium truncate">
                          {r.title ? r.title : r.original_title}
                        </h3>
                        <p
                          className={`ml-auto px-2 rounded-full text-xs font-normal ${
                            Math.round(r.vote_average) < 5
                              ? "text-red-500 dark:text-red-600 bg-red-100 dark:bg-red-600/30 dark:border dark:border-red-600"
                              : Math.round(r.vote_average) < 7
                              ? "text-yellow-500 dark:text-yellow-600 bg-yellow-100 dark:bg-yellow-600/30 dark:border dark:border-yellow-600"
                              : "text-green-500 dark:text-green-600 bg-green-100 dark:bg-green-600/30 dark:border dark:border-green-600"
                          }`}
                        >{`${Math.round(r.vote_average)}/10`}</p>
                      </div>
                    ) : undefined}
                  </a>
                </li>
              ))}
            </ul>
          ) : undefined,
      },
    },
  ];

  return (
    <div className="w-full h-auto mx-auto z-0 relative">
      {backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          className="w-full h-full object-cover z-0 absolute"
        />
      ) : undefined}

      <div
        className={`flex flex-col ${
          backdrop_path
            ? "bg-blue-50/90 backdrop-blur-xl dark:bg-slate-800/90 dark:backdrop-blur-2xl"
            : "bg-blue-50 dark:bg-slate-800"
        } w-full -mt-4 px-4 pt-10 lg:px-14 text-blue-600 dark:text-blue-500`}
      >
        {PaneItems.map(
          ({ title: { text, options }, body: { verify, content } }, idx) =>
            verify ? (
              <div key={idx}>
                <h2
                  className={`${options} text-xl font-medium text-blue-800 dark:text-blue-600`}
                >
                  {text}
                </h2>
                {content}
              </div>
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
    </div>
  );
};

export default Pane;
