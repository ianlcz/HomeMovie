import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseCircle } from "react-icons/io5";
import PopUpContext from "../contexts/pop-up.context";

const PopUp = ({ title, content, onClick }) => {
  const { isShow, closePopUp } = useContext(PopUpContext);
  const [isOpen, setIsOpen] = useState(isShow);

  return createPortal(
    isShow ? (
      <>
        <div
          className="flex items-center justify-center w-full h-screen top-0 left-0 z-50 bg-white/25 dark:bg-blue-400/25 backdrop-blur-lg fixed"
          onClick={(e) => onClick(e)}
        >
          <div className="w-[90%] lg:w-2/5 mx-auto my-auto bg-white dark:bg-slate-600 rounded-xl shadow-lg">
            {title && content ? (
              <>
                <IoCloseCircle
                  className="w-6 h-6 ml-auto mr-2 mt-2 text-blue-200 dark:text-white hover:text-red-300 cursor-pointer"
                  onClick={() => closePopUp()}
                />

                <div className="px-8 pb-8">
                  <h1 className="mb-2 pb-3 font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-t from-blue-800 to-blue-400 dark:from-blue-700 dark:to-blue-400">
                    {title}
                  </h1>

                  <div className="text-sm text-blue-600 dark:text-blue-300">
                    {content}
                  </div>
                </div>
              </>
            ) : (
              content
            )}
          </div>
        </div>
      </>
    ) : undefined,
    document.getElementById("root"),
  );
};

export default PopUp;
