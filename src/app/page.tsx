"use client";

import { useState } from "react";

export default function Home() {
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
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Decision Maker</h1>
          <p style={styles.headerSubtitle}>
            Get instant answers to your yes or no questions
          </p>
        </div>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.cardContainer}>
          <div style={styles.section}>
            <label style={styles.label}>Your Question</label>
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

          <div style={styles.section}>
            <label style={styles.label}>Answer</label>
            <div style={styles.answerDisplay}>
              {loading && (
                <div style={styles.loadingState}>
                  <p style={styles.loadingText}>Processing...</p>
                </div>
              )}

              {answer && !loading && (
                <div style={styles.answerResult}>
                  <div
                    style={{
                      ...styles.answerBox,
                      backgroundColor:
                        answer === "YES" ? "#1D3557" : "#E63946",
                    }}
                  >
                    <p style={styles.answerText}>{answer}</p>
                  </div>
                  <p style={styles.answerEmoji}>
                    {answer === "YES" ? "✓" : "✕"}
                  </p>
                </div>
              )}

              {!answer && !loading && (
                <div style={styles.emptyState}>
                  <p style={styles.emptyStateText}>
                    Ask a question to get started
                  </p>
                </div>
              )}
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.buttonGroup}>
              <button
                onClick={handleDecide}
                disabled={!question.trim() || loading}
                style={{
                  ...styles.button,
                  ...styles.primaryButton,
                  opacity: !question.trim() || loading ? 0.5 : 1,
                  cursor:
                    !question.trim() || loading
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Get Answer
              </button>
              <button
                onClick={handleReset}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...styles.secondaryButton,
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 Decision Maker. Simple. Reliable. Clear.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  pageWrapper: {