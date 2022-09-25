import { IoInformationCircle } from "react-icons/io5";
import { formatName } from "../../../utils";

const TechnicalTeamSection = ({ title, content }) =>
  content.length > 0 || title === "Un film de" ? (
    <div className={title === "Un film de" ? "my-4 lg:mt-0 lg:mb-6" : "mt-6"}>
      <p className="font-medium text-blue-100 text-center mb-2">{title}</p>
      <ul
        className={`flex flex-row flex-wrap items-center ${
          content.length > 2 && title !== "Un film de"
            ? "justify-between"
            : "justify-evenly"
        } ${
          title === "Un film de" ? "w-full lg:w-1/2" : "w-full"
        } mx-auto gap-x-4 gap-y-2`}
      >
        {content.length > 0 ? (
          content.map((c) => {
            const body = (
              <>
                {c.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
                    alt={`Profil de ${c.name}`}
                    className="mr-2 rounded-full w-7 h-7 object-cover shadow-md"
                  />
                ) : undefined}
                <p className="text-sm">
                  <span className="font-light">
                    {formatName(c.name).firstname}
                  </span>
                  <span className="font-semibold">
                    {formatName(c.name).lastname}
                  </span>
                </p>
              </>
            );

            return (
              <li
                key={c.id}
                className={
                  c.profile_path
                    ? "pr-2 hover:bg-blue-50/20 hover:dark:bg-slate-800/25 backdrop-filter hover:backdrop-blur rounded-full transition duration-[800ms] ease-in-out cursor-pointer"
                    : ""
                }
              >
                {c.profile_path ? (
                  <a
                    href={`/credits/${c.id}`}
                    className="flex flex-row items-center"
                    title="Voir le profil"
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })
        ) : (
          <div className="flex flex-row items-center ">
            <IoInformationCircle size={"20px"} />
            <p className="ml-1 font-medium text-sm">Aucun réalisateur</p>
          </div>
        )}
      </ul>
    </div>
  ) : undefined;

export default TechnicalTeamSection;
