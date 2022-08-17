import Background from "../Background";

const Collection = ({ data }) =>
  data && data.name && data.backdrop_path ? (
    <div className="w-full lg:w-1/2 mx-auto mt-10">
      <Background
        data={{
          cover: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
          title: data.name,
        }}
        isOnPane
      >
        <div className="px-4 flex flex-col text-white">
          <div className="flex flex-col lg:flex-row flex-wrap gap-x-1 mb-2 lg:mb-2 text-lg lg:text-xl items-center justify-center">
            <h2 className="font-semibold">Fait partie de la collection</h2>

            <p className="ml-0.5 font-normal">{data.name.split(" - ")[0]}</p>
          </div>

          <ul className="flex flex-row flex-wrap font-extralight text-sm justify-left">
            <span className="mr-1">Comprend</span>
            {data.parts
              .sort(
                (a, b) => new Date(a.release_date) > new Date(b.release_date),
              )
              .map(({ id, title, release_date }, index) => (
                <li key={id}>
                  <a
                    href={`/movies/${title.toLowerCase()}?year=${String(
                      new Date(release_date).getFullYear(),
                    )}`}
                    title={`Voir la fiche du film`}
                    className="font-normal hover:font-medium transition-all duration-700 ease-in-out"
                  >
                    {title}
                  </a>
                  {index + 1 < data.parts.length ? (
                    <span className="mr-1">,</span>
                  ) : undefined}
                </li>
              ))}
          </ul>
        </div>
      </Background>
    </div>
  ) : undefined;

export default Collection;
