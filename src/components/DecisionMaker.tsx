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
    <div style={styles.pageWrapper}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Decision Maker</h1>
          <p style={styles.headerSubtitle}>
            Get instant answers to your yes or no questions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.cardContainer}>
          {/* Input Section */}
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

          {/* Answer Section */}
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

          {/* Actions Section */}
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

      {/* Footer */}
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
    minHeight: "100vh",
    backgroundColor: "#F0F4F8",
    display: "flex",
    flexDirection: "column" as const,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #E8EEF5",
    padding: "3rem 2rem",
  },
  headerContent: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  headerTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1D3557",
    margin: 0,
    marginBottom: "0.5rem",
  },
  headerSubtitle: {
    fontSize: "1rem",
    color: "#546B82",
    margin: 0,
    fontWeight: 400,
  },
  mainContent: {
    flex: 1,
    padding: "3rem 2rem",
  },
  cardContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
    padding: "2rem",
    border: "1px solid #E8EEF5",
  },
  section: {
    marginBottom: "2rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#1D3557",
    marginBottom: "0.75rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  input: {
    width: "100%",
    padding: "1rem",
    fontSize: "1rem",
    border: "1px solid #D1D9E0",
    backgroundColor: "#F0F4F8",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
    color: "#1D3557",
  },
  answerDisplay: {
    minHeight: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F4F8",
    border: "1px solid #D1D9E0",
    padding: "1rem",
  },
  loadingState: {
    textAlign: "center" as const,
  },
  loadingText: {
    fontSize: "1rem",
    color: "#546B82",
    margin: 0,
  },
  answerResult: {
    textAlign: "center" as const,
    width: "100%",
  },
  answerBox: {
    padding: "1.5rem",
    marginBottom: "1rem",
  },
  answerText: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#FFFFFF",
    margin: 0,
    letterSpacing: "0.1em",
  },
  answerEmoji: {
    fontSize: "1.5rem",
    margin: 0,
  },
  emptyState: {
    textAlign: "center" as const,
  },
  emptyStateText: {
    fontSize: "0.95rem",
    color: "#8899AA",
    margin: 0,
    fontWeight: 400,
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    flex: 1,
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "none",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  primaryButton: {
    backgroundColor: "#1D3557",
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "#F0F4F8",
    color: "#1D3557",
    border: "1px solid #D1D9E0",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    borderTop: "1px solid #E8EEF5",
    padding: "2rem",
    textAlign: "center" as const,
  },
  footerText: {
    fontSize: "0.875rem",
    color: "#8899AA",
    margin: 0,
  },
};