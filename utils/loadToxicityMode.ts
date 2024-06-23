import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

let model = null;

export const loadToxicityModel = async () => {
  if (!model) {
    model = await toxicity.load();
  }

  return model;
};
