const Background = ({
  data: { cover, title },
  children,
  isOnPane = false,
  hasCover = !new URL(cover).pathname.includes("/null"),
}) => (
  <section className={`w-full h-auto mx-auto z-0 relative`}>
    {hasCover ? (
      <img
        src={cover}
        className={`w-full h-full object-cover ${
          isOnPane ? "rounded-2xl" : undefined
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
          ? `py-12 shadow-inner rounded-2xl ${
              hasCover ? "bg-blue-600/50" : "bg-blue-600"
            }`
          : `px-8 py-6 text-white ${
              hasCover ? "bg-blue-600/70" : "bg-blue-600"
            }`
      } z-10 relative`}
    >
      {children}
    </div>
  </section>
);

export default Background;
