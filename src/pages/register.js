import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/account/register", {
        emailAddress,
        password,
        confirmPassword,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err.message));

    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>{`Inscription | HomeMovie`}</title>
      </Helmet>
      <div className="flex flex-col bg-gradient-to-br from-blue-600 to-blue-400 dark:from-slate-800 dark:to-slate-800 min-h-screen">
        <div className="w-5/6 lg:w-2/5 mx-auto my-auto p-8 bg-blue-50 dark:bg-slate-600 rounded-xl shadow-lg">
          <h1 className="font-semibold text-2xl text-center text-blue-500">
            Inscription
          </h1>

          <form onSubmit={handleRegister}>
            <div className="flex flex-col w-auto mx-auto mt-6">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Entrez votre email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
                className="w-max mx-auto mb-4 px-4 py-1 text-base text-blue-400 focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner transition duration-700 ease-in-out"
              />

              <div className="flex flex-col lg:flex-row mb-4 items-center">
                <input
                  type="password"
                  name="password"
                  autoComplete="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-max mx-auto mb-2 lg:mb-0 lg:mr-4 px-4 py-1 text-base text-blue-400 focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner transition duration-700 ease-in-out"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmation de votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-max mx-auto px-4 py-1 text-base text-blue-400 focus:outline-none focus:ring-2 focus:dark:ring-1 focus:ring-blue-500 border border-blue-500 placeholder-blue-400 dark:bg-slate-800 rounded-full font-semibold shadow-inner transition duration-700 ease-in-out"
                />
              </div>
            </div>

            <div className="w-max mx-auto">
              <button
                type="submit"
                className="mt-4 px-4 text-sm py-1 bg-gradient-to-tr from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 font-medium text-blue-50 rounded-full"
              >
                Créer mon compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
