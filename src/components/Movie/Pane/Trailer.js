const Trailer = ({ children }) => {
  const trailer =
    children[Math.floor(Math.random() * Math.floor(children.length))];

  return (
    <div className="aspect-w-16 aspect-h-[9.4] rounded-xl">
      <iframe
        className="rounded-xl shadow-lg"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Trailer;
