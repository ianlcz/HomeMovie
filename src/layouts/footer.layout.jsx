const Footer = () => (
  <footer className="flex flex-col w-max mx-auto bottom-0 mt-auto px-2 py-0.5 bg-blue-50 justify-center items-center text-white text-xs font-light bg-gradient-to-tr from-blue-800 to-blue-400 rounded-t-lg shadow-inner">
    <p className="font-semibold">License MIT</p>
    <div className="flex flex-row mt-0.5">
      <p className="mr-1">Copyright &copy; 2021 - {new Date().getFullYear()}</p>
      <a
        href="https://github.com/ianlcz"
        target="_blank"
        rel="noreferrer"
        title="Voir le profil GitHub"
      >
        Yann Le Coz
      </a>
    </div>
  </footer>
);

export default Footer;
