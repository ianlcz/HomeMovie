const Background = ({
  data: { cover, title },
  children,
  isOnPane = false,
  hasCover = !new URL(cover).pathname.includes("/null"),
}) => (
  <section className={`w-full h-auto mx-auto z-10 relative`}>
    {hasCover ? (
      <img
        src={cover}
        className={`w-full h-full object-cover ${
          isOnPane ? "rounded-xl" : "rounded-b-2xl"
        } z-0 absolute`}
        alt={`Couverture ${
          isOnPane ? "de la collection" : "du film"
        } : ${title}`}
      />
    ) : undefined}

    <div
      className={`top-0 left-0 w-full h-full
      ${
        isOnPane
          ? `py-12 shadow-inner rounded-xl ${
              hasCover ? "bg-blue-800/60" : "bg-blue-800"
            }`
          : `px-8 py-6 shadow-lg text-white rounded-b-2xl ${
              hasCover ? "bg-blue-800/70" : "bg-blue-800"
            }`
      } z-0 relative`}
    >
      <div className="rounded-b-2xl">{children}</div>
    </div>
  </section>
);

export default Background;
