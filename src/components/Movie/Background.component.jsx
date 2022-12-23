const Background = ({
  data: { cover, title },
  children,
  onPane = false,
  onPopUp = false,
  hasCover = !new URL(cover).pathname.includes("/null"),
}) => (
  <section className={`w-full h-auto mx-auto z-10 relative`}>
    {hasCover ? (
      <img
        src={cover}
        className={`w-full h-full object-cover ${
          onPane || onPopUp ? "rounded-xl" : "rounded-b-2xl"
        } z-0 absolute`}
        alt={`Couverture ${onPane ? "de la collection" : "du film"} : ${title}`}
      />
    ) : undefined}

    <div
      className={`top-0 left-0 w-full h-full
      ${
        onPane
          ? `py-12 shadow-inner rounded-xl ${
              hasCover ? "bg-blue-800/60" : "bg-blue-800"
            }`
          : `${
              onPopUp
                ? "rounded-xl"
                : "px-6 lg:px-0 py-8 rounded-b-2xl shadow-lg"
            } text-white ${
              hasCover
                ? "bg-gradient-to-b from-blue-800/60 to-blue-800/90"
                : "bg-blue-800"
            }`
      } z-0 relative`}
    >
      <div className="rounded-b-2xl">{children}</div>
    </div>
  </section>
);

export default Background;
