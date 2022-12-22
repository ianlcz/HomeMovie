import { createContext, useState } from "react";

const PopUpContext = createContext({
  isShow: false,
  movie: {},
  displayMovieOnPopUp: (movie) => {},
  closePopUp: () => {},
});

export const PopUpProvider = ({ children }) => {
  const { Provider } = PopUpContext;
  const [isShow, setIsShow] = useState(false);
  const [movie, setMovie] = useState({});

  const displayMovieOnPopUp = ({ ref, title, year }) => {
    setMovie({ ref, title, year });
    setIsShow(true);
  };

  const closePopUp = () => {
    setIsShow(false);
  };

  return (
    <Provider
      value={{
        isShow,
        setIsShow,
        movie,
        displayMovieOnPopUp,
        closePopUp,
      }}
    >
      {children}
    </Provider>
  );
};

export default PopUpContext;
