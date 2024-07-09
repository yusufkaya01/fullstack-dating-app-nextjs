import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

const URL = "https://teachablemachine.withgoogle.com/models/cKDpvDQVJ/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

const NudeContext = createContext<{
  handleNude: (url: string) => Promise<boolean>;
  isFine: boolean;
}>({
  handleNude: async () => false,
  isFine: false,
});

export const NudeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isFine, setIsFine] = useState<boolean>(false);

  useEffect(() => {
    // Preload the model on mount
    const preloadModel = async () => {
      await tmImage.load(modelURL, metadataURL);
    };
    preloadModel();
  }, []);

  const handleNude = async (url: string): Promise<boolean> => {
    const model = await tmImage.load(modelURL, metadataURL);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // To handle CORS issues
      img.src = url;

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const predictions = await model.predict(canvas);
          console.log(predictions);

          const isFine = predictions.some(
            (prediction) =>
              prediction.className === "fine" && prediction.probability > 0.5,
          );

          setIsFine(isFine);
          resolve(isFine);
        } else {
          reject(new Error("Canvas context not available"));
        }
      };

      img.onerror = (error) => {
        console.error("Error loading image:", error);
        reject(error);
      };
    });
  };

  return (
    <NudeContext.Provider value={{ handleNude, isFine }}>
      {children}
    </NudeContext.Provider>
  );
};

export const useNude = () => useContext(NudeContext);
