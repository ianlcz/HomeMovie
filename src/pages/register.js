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
        <title>{`Inscription | Movie House`}</title>
      </Helmet>
      <div className="flex flex-col bg-gradient-to-br from-blue-600 to-blue-400 min-h-screen">
        <div className="w-5/6 lg:w-2/5 mx-auto my-auto p-8 bg-blue-50 rounded-xl shadow-lg">
          <h1 className="font-semibold text-2xl text-center text-blue-900">
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
                className="w-max mx-auto mb-4 px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
              />

              <div className="flex flex-col lg:flex-row mb-4">
                <input
                  type="password"
                  name="password"
                  autoComplete="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-max mx-auto mb-2 lg:mr-4 px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmation de votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-max mx-auto px-4 py-1 text-sm text-blue-400 border-2 border-blue-200 placeholder-blue-200 rounded-full font-semibold shadow-inner"
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
