import { useEffect, useState } from "react";
import { SiPrimevideo, SiNetflix, SiAppletv } from "react-icons/si";
import axios from "axios";

const StreamPlatform = ({ movie_id }) => {
  const [streamPlatform, setStreamPlatform] = useState(undefined);
  const streamConfig = {
    "Amazon Prime Video": {
      icon: <SiPrimevideo size={50} />,
      color: "bg-blue-500",
    },
    "Apple TV Plus": { icon: <SiAppletv size={40} />, color: "bg-gray-900" },
    Netflix: { icon: <SiNetflix size={28} />, color: "bg-red-600" },
  };

  useEffect(() => {
    const fetchStream = async () => {
      const {
        FR: { flatrate },
      } = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`,
        )
        .then((res) => res.data.results)
        .catch((err) => console.error(err.message));

      setStreamPlatform(flatrate ? flatrate[0] : undefined);
    };
    fetchStream();
  }, []);

  return streamPlatform && streamConfig[streamPlatform.provider_name] ? (
    <div
      className={`hidden lg:flex flex-row justify-evenly items-center rounded-full w-11/12 mx-auto shadow-md cursor-default mt-4 ${
        streamPlatform.provider_name === "Netflix"
          ? "py-2"
          : streamPlatform.provider_name === "Apple TV Plus"
          ? "py-1"
          : "py-0"
      } ${streamConfig[streamPlatform.provider_name].color}`}
    >
      {streamConfig[streamPlatform.provider_name].icon}
      <div className="flex flex-col text-sm leading-tight">
        <h4 className="font-light">Disponible en streaming</h4>
        <h3 className="font-semibold">Regardez maintenant</h3>
      </div>
    </div>
  ) : undefined;
};

export default StreamPlatform;
