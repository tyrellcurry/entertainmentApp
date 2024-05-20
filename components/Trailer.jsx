import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AIGeneration from "./AIGeneration";
const Trailer = ({ title, toggleTrailer, large }) => {
  return (
    <div className="w-full h-full bg-x-mirage/[.85] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center p-4">
      <div className="w-full bg-[#647087] z-20 h-fit min-h-[500px] max-w-[800px] p-10 rounded-lg text-center relative">
        <div className="absolute top-4 right-6">
          <button className="text-3xl text-black w-6" onClick={toggleTrailer}>
            <FontAwesomeIcon icon={faXmark} style={{ color: 'black' }} />
          </button>
        </div>
        <h2 className="text-2xl font-semibold">{title} | Trailer</h2>
        <div>
          <AIGeneration title={title} large={large} />
        </div>
      </div>
    </div>
  );
};

export default Trailer;
