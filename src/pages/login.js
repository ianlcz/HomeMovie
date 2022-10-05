import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = `Connexion | HomeMovie` || "";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(emailAddress, password);
    window.location.reload(false);
  };

  return (
    <>
      <div className="h-screen lg:min-h-screen flex flex-col bg-blue-100 dark:bg-slate-800">
        <div className="w-11/12 lg:w-2/5 mx-auto my-auto py-8 bg-white dark:bg-slate-600 rounded-xl shadow-lg">
          <h1 className="font-semibold text-2xl text-center text-blue-800 dark:text-blue-500">
            Connexion
          </h1>

          <form onSubmit={handleLogin}>
            <div className="flex flex-col w-max mx-auto mt-6">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Votre adresse e-mail"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
                className="mb-4 px-4 py-1 text-blue-400 focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner transition duration-700 ease-in-out"
              />
              <input
                type="password"
                name="password"
                autoComplete="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-4 px-4 py-1 text-blue-400 focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner transition duration-700 ease-in-out"
              />
            </div>

            <div className="w-max mx-auto">
              <button
                type="submit"
                className="mt-4 mb-6 px-4 text-sm py-1 bg-gradient-to-tr from-blue-800 to-blue-400 hover:from-blue-400 hover:to-blue-800 font-medium text-blue-50 rounded-full"
              >
                Accéder à ma collection
              </button>
            </div>

            <div className="flex items-center text-xs w-max mx-auto">
              <p className="mr-1.5 font-semibold text-blue-500">
                Vous n'avez pas de compte ?
              </p>

              <a
                className="text-blue-500 dark:text-blue-300 hover:underline cursor-pointer"
                href="/register"
              >
                {`Créer un compte`}
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
