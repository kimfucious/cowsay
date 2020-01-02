import React, { useEffect } from "react";

export default ({
  cowsays,
  dateTime,
  isHidden,
  setIsHidden,
  setDateTime,
  termColor
}) => {
  useEffect(() => {
    let timeout;
    if (!cowsays.length) {
      timeout = setTimeout(() => {
        setIsHidden(!isHidden);
      }, 750);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  }, [isHidden, cowsays, setIsHidden]);

  useEffect(() => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    setDateTime(dateTime);
  }, [setDateTime]);
  return (
    <pre
      className="mt-3 mt-sm-5 w-100"
      style={{
        color: termColor,
        fontFamily: "'VT323', monospace",
        margin: "0",
        fontSize: "24px"
      }}
    >
      <div className="d-block d-sm-none">
        <span role="img" aria-label="cow head">
          🐮
        </span>
        [cowsay]:~$ <span hidden={isHidden}>█</span>
      </div>
      <div className="d-none d-sm-block">
        <span role="img" aria-label="cow head">
          🐮
        </span>
        [{dateTime}]:~$ <span hidden={isHidden}>█</span>
      </div>
    </pre>
  );
};
