import { useEffect, useState } from "react";
import { SiPrimevideo, SiNetflix, SiAppletv } from "react-icons/si";
import axios from "axios";

const StreamPlatform = ({ provider }) => {
  const streamConfig = {
    "Amazon Prime Video": {
      icon: <SiPrimevideo size={50} />,
      color: "bg-[#49a8dc]",
    },
    "Apple TV Plus": { icon: <SiAppletv size={40} />, color: "bg-[#303030]" },
    Netflix: { icon: <SiNetflix size={28} />, color: "bg-[#d32f27]" },
  };

  return provider && streamConfig[provider.flatrate[0].provider_name] ? (
    <a
      className={`hidden lg:flex flex-row justify-evenly items-center rounded-full w-11/12 mx-auto shadow-md mt-4 ${
        provider.flatrate[0].provider_name === "Netflix"
          ? "py-2"
          : provider.flatrate[0].provider_name === "Apple TV Plus"
          ? "py-1"
          : "py-0"
      } ${streamConfig[provider.flatrate[0].provider_name].color}`}
      href={provider.link}
      target="_blank"
    >
      {streamConfig[provider.flatrate[0].provider_name].icon}
      <div className="flex flex-col text-sm leading-tight">
        <h4 className="font-light">Disponible en streaming</h4>
        <h3 className="font-semibold">Regardez maintenant</h3>
      </div>
    </a>
  ) : undefined;
};

export default StreamPlatform;
