import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleFormChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setFileError("");
    } else {
      setFile(null);
      setFileError("File format not supported");
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={handleFormChange} />
        <span>+</span>
      </label>
      <div className="output">
        {file && <div>{file.name}</div>}
        {fileError && <div className="error"> {fileError} </div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
