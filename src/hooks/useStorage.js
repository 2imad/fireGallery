import { useState, useEffect } from "react";
import { mainStorage, mainFireStore, timeStamp } from "../firebase/config";

const useStorage = (file) => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try {
      const storageRef = mainStorage.ref(file.name);
      const collectionRef = mainFireStore.collection("images");
      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          setError(error);
        },
        async () => {
          let url = await storageRef.getDownloadURL();
          const createdAt = timeStamp();
          collectionRef.add({ url, createdAt });
          setUrl(url);
        }
      );
    } catch (e) {
      setError(e);
    }
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
