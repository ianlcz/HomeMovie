const Card = ({
  children: { poster_path, title, release_date, overview },
  onClick,
  isClicked,
}) => {
  return (
    <li
      className={`p-2 flex flex-col lg:flex-row items-center justify-center lg:justify-start cursor-pointer rounded-xl ${
        isClicked
          ? "bg-blue-200 dark:bg-blue-200/80"
          : "hover:bg-blue-100 hover:dark:bg-blue-100/80 transition-all duration-100 ease-in-out"
      }`}
      onClick={onClick}
    >
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt={`Affiche du film : ${title}`}
          className="w-24 mb-4 mr-0 lg:mb-0 lg:mr-2 rounded-md shadow-xl"
        />
      ) : undefined}

      <div className="w-max">
        <div className="flex flex-row items-center w-max mx-auto px-2 rounded-full text-white bg-gradient-to-br from-blue-800 to-blue-400 truncate">
          <h2 className="mr-2 text-xs lg:text-sm font-semibold">{title}</h2>

          {release_date ? (
            <p className="text-xs lg:text-sm">{`(${new Date(
              release_date,
            ).getFullYear()})`}</p>
          ) : undefined}
        </div>
      </div>
    </li>
  );
};

export default Card;
