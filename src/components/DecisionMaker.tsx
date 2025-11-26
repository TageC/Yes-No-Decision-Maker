"use client";

import { useState } from "react";

export default function DecisionMaker() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<"YES" | "NO" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDecide = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuestion("");
    setAnswer(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading && question.trim()) {
      handleDecide();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Decision Maker</h1>

        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a yes or no question..."
            disabled={loading}
            style={styles.input}
          />
        </div>

        <div style={styles.answerContainer}>
          {loading && <p style={styles.loading}>Deciding...</p>}
          {answer && !loading && (
            <div style={styles.answerBox}>
              <p style={styles.answer}>{answer}</p>
              <p style={styles.emoji}>{answer === "YES" ? "✅" : "❌"}</p>
            </div>
          )}
          {!answer && !loading && (
            <p style={styles.placeholder}>Ask a question</p>
          )}
        </div>

        <div style={styles.buttonWrapper}>
          <button
            onClick={handleDecide}
            disabled={!question.trim() || loading}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              opacity: !question.trim() || loading ? 0.5 : 1,
            }}
          >
            Decide
          </button>
          <button
            onClick={handleReset}
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.secondaryButton,
              opacity: loading ? 0.5 : 1,
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    backgroundColor: "#ffffff",
  } as React.CSSProperties,
  card: {
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #000000",
    padding: "2rem",
  } as React.CSSProperties,
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: "#000000",
  } as React.CSSProperties,
  inputWrapper: {
    marginBottom: "1.5rem",
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #000000",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontFamily: "inherit",
  } as React.CSSProperties,
  answerContainer: {
    minHeight: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
  } as React.CSSProperties,
  loading: {
    color: "#000000",
    fontSize: "1rem",
  } as React.CSSProperties,
  answerBox: {
    textAlign: "center" as const,
  } as React.CSSProperties,
  answer: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#000000",
    marginBottom: "0.5rem",
  } as React.CSSProperties,
  emoji: {
    fontSize: "1.5rem",
  } as React.CSSProperties,
  placeholder: {
    color: "#999999",
    fontSize: "0.875rem",
  } as React.CSSProperties,
  buttonWrapper: {
    display: "flex",
    gap: "0.5rem",
  } as React.CSSProperties,
  button: {
    padding: "0.75rem 1rem",
    fontWeight: "bold",
    fontSize: "1rem",
    border: "1px solid #000000",
    cursor: "pointer",
    fontFamily: "inherit",
  } as React.CSSProperties,
  primaryButton: {
    flex: 1,
    backgroundColor: "#000000",
    color: "#ffffff",
  } as React.CSSProperties,
  secondaryButton: {
    backgroundColor: "#ffffff",
    color: "#000000",
  } as React.CSSProperties,
};