import React from "react";
import { EmotionResponse } from "../types";

interface Props {
  result: EmotionResponse;
}

const EmotionResult: React.FC<Props> = ({ result }) => {
  return (
    <div style={{
      border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginTop: "1rem"
    }}>
      <h3>Detected Emotion: {result.emotion}</h3>
      <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
    </div>
  );
};

export default EmotionResult;
