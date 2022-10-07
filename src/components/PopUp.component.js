import { useState } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet";
import { IoCloseCircle } from "react-icons/io5";

const PopUp = ({ title, content, isShow }) => {
  const [isOpen, setIsOpen] = useState(isShow);

  return createPortal(
    isOpen ? (
      <>
        <Helmet
          meta={[
            {
              name: `theme-color`,
              content: isOpen ? "#7f1d1d" : "#1e40af",
            },
          ]}
        ></Helmet>
        <div className="flex items-center justify-center w-full h-screen top-0 left-0 z-50 bg-red-400/40 dark:bg-red-400/20 backdrop-blur-lg fixed">
          <div className="w-2/5 mx-auto my-auto p-8 bg-white dark:bg-slate-600 rounded-xl shadow-lg">
            <div className="flex flex-row items-center justify-between mb-2 pb-3">
              <h1 className="font-semibold text-2xl text-center text-red-800 dark:text-red-500">
                {title}
              </h1>
              <IoCloseCircle
                className="w-6 h-6 text-red-300 hover:text-red-400 cursor-pointer"
                onClick={() => setIsOpen(!isShow)}
              />
            </div>
            <div className="text text-red-600 dark:text-red-300">{content}</div>
          </div>
        </div>
      </>
    ) : undefined,
    document.getElementById("root"),
  );
};

export default PopUp;
