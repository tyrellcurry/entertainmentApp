import React, { useEffect, useState } from "react";

const AIGeneration = ({ title, large }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        const newDots = prevDots.length < 3 ? prevDots + "." : "";
        return newDots;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async (prompt) => {
      try {
        const response = await fetch(`http://localhost:8000/api/ai`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const oBlob = new Blob([arrayBuffer], { type: "audio/mpeg" });
        const audioURL = URL.createObjectURL(oBlob);
        setAudioUrl(audioURL);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(title);
  }, [title]);

  return (
    <div>
      <img src={large} alt="" className={"block rounded-lg m-auto pt-4"} />
      <div>
        {audioUrl.length > 0 ? (
          <div className="text-md md:text-xl font-semibold m-auto pt-3">
            <h2>This movie trailer is narrated using OpenAI models.</h2>
            <div className="flex justify-center pt-4">
              <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        ) : (
          <div className="text-md md:text-xl font-semibold m-auto pt-3 flex justify-center">
            <p>Movie trailer generating, please wait</p>
            <p className="w-[10px]">{dots}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGeneration;
