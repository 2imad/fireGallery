import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

const ProgressBar = ({ file, setFile }) => {
  const { progress, url, error } = useStorage(file);
  console.log(progress, url, error);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return <div className="progress-bar" style={{ width: progress + "%" }} />;
};

export default ProgressBar;
