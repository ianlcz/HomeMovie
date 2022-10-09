const Submit = ({ buttonTitle }) => (
  <div className="flex mx-auto mt-6 justify-between lg:justify-evenly">
    <button
      type="submit"
      className="px-4 text-sm py-1 bg-green-400 hover:bg-green-600 font-semibold text-green-50 rounded-full shadow-inner"
    >
      {buttonTitle}
    </button>

    <a
      href="/"
      className="px-4 text-sm py-1 bg-red-400  hover:bg-red-600 font-semibold text-red-50 rounded-full shadow-inner"
    >
      {buttonTitle !== "Oui" ? "Annuler" : "Non"}
    </a>
  </div>
);

export default Submit;
