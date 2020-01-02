import React, { useState } from "react";
import Prompt from "./Prompt";

const CowsayOutput = ({ cowsays, character }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [dateTime, setDateTime] = useState(false);

  const getFontSize = character => {
    switch (character.toLowerCase()) {
      case "turtle":
      case "dragon":
      case "turkey":
      case "ghostbusters":
        return window.innerWidth > 320 ? "14" : "10";
      default:
        return window.innerWidth > 320 ? "16" : "12";
    }
  };
  const renderCowsays = () => {
    const termColor = "#4AF626";
    if (cowsays) {
      return (
        <pre className="mt-3">
          <code
            style={{
              color: termColor,
              fontFamily: "'Fira Code', monospace",
              // Cowsay message spacing gets messed up using VT323
              // fontFamily: "'VT323', monospace",
              fontSize: getFontSize(character) + "px",
              lineHeight: "1.2",
              margin: "0",
              whiteSpace: "pre",
              overflowY: "hidden"
            }}
          >
            {cowsays}
          </code>
        </pre>
      );
    } else {
      return (
        <Prompt
          cowsays={cowsays}
          dateTime={dateTime}
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          setDateTime={setDateTime}
          termColor={termColor}
        />
      );
    }
  };
  return (
    <div
      className="py-3 pl-0 d-flex justify-content-center w-100"
      style={{
        backgroundColor: "#222"
      }}
    >
      {renderCowsays()}
    </div>
  );
};

export default CowsayOutput;
