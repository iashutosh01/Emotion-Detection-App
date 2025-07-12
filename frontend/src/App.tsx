import React, { useState } from "react";
import { analyzeText } from "./api";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ emotion: string; confidence: number; emoji: string } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please type something before submitting.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await analyzeText(trimmed);
      setResult(res);
    } catch {
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Emotion Detection!</h1>

      <textarea
        rows={4}
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (error) setError("");
        }}
      />

      <button onClick={handleSubmit} disabled={loading || !text.trim()}>
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-card">
          <h2>{result.emoji} {result.emotion}</h2>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
