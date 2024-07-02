import { PropsWithChildren, createContext, useContext, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

const ToxicityContext = createContext({});

const ToxicityProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isToxic, setIsToxic] = useState(false);
  const handleToxicity = async (text: string) => {
    const model = await toxicity.load();
    const predictions = await model.classify(text);
    const toxic = predictions.some(
      (prediction) =>
        prediction.label === "toxicity" && prediction.results[0].match,
    );
    setIsToxic(toxic);
    return toxic;
  };
  return (
    <ToxicityContext.Provider value={{ handleToxicity, isToxic }}>
      {children}
    </ToxicityContext.Provider>
  );
};

export const useToxicity = () => useContext(ToxicityContext);

export default ToxicityProvider;
