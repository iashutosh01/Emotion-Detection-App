import axios from "axios";
import { EmotionResponse } from "./types";

export const analyzeText = async (text: string): Promise<EmotionResponse> => {
  const res = await axios.post<EmotionResponse>("http://localhost:8000/analyze", { text });
  return res.data;
};
