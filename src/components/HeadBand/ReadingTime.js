import { IoTimeOutline } from "react-icons/io5";
import { formatTime } from "../../utils";

const ReadingTime = ({ children }) => (
  <div className={`flex flex-row w-max mx-auto items-center`}>
    <IoTimeOutline className="h-4 md:h-14" />
    <p className={`font-light ml-1.5 text-xs md:text-sm`}>{formatTime(children)}</p>
  </div>
);

export default ReadingTime;
