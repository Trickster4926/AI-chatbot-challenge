import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  // Chat history load
  useEffect(() => {
    fetch("http://localhost:5000/api/chat/history")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // Auto-scroll to lastest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = async () => {
    if (!input.trim() || input.length > 500 || thinking) return;

    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setThinking(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI service error");
      }

      setThinking(false);
      setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
    } catch (err) {
      setThinking(false);
      setError("AI is currently unavailable. Please try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatBox}>
        <div style={styles.header}>Ollama AI Chat</div>

        <div style={styles.messages} className="hide-scroll">
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.messageWrapper,
                alignSelf: m.role === "user" ? "flex-end" : "flex-start"
              }}
            >
              <div
                style={{
                  ...styles.label,
                  textAlign: m.role === "user" ? "right" : "left"
                }}
              >
                {m.role === "user" ? "[YOU]" : "[AI]"}
              </div>
              <div
                style={{
                  ...styles.message,
                  background: m.role === "user" ? "#005c4b" : "#1f2c34"
                }}
              >
                {m.content}
              </div>
            </div>
          ))}

          {thinking && (
            <div style={styles.thinkingBar}>
              AI is thinking
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          {error && !thinking && (
            <div style={{ ...styles.thinkingBar, color: "#ff6b6b" }}>
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div style={styles.inputBox}>
          <input
            value={input}
            maxLength={500}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            style={styles.input}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>


      <style jsx>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          scrollbar-width: none;
        }

        .dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          margin: 0 2px;
          background: #aebac1;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}


const styles = {
  thinkingBar: {
    padding: "6px 12px",
    fontSize: 13,
    color: "#aebac1",
    background: "#111b21"
  },
  page: {
    height: "100vh",
    background: "#0b141a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#e9edef"
  },
  chatBox: {
    width: 420,
    height: 620,
    background: "#111b21",
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    overflow: "hidden"
  },
  header: {
    padding: 14,
    background: "#202c33",
    textAlign: "center",
    fontWeight: "bold"
  },
  messages: {
    flex: 1,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflowY: "auto"
  },
  messageWrapper: {
    maxWidth: "75%",
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  label: {
    fontSize: 11,
    opacity: 0.6
  },
  message: {
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
    lineHeight: 1.4
  },
  inputBox: {
    display: "flex",
    padding: 10,
    background: "#202c33"
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    border: "none",
    background: "#2a3942",
    color: "#fff",
    outline: "none"
  },
  button: {
    marginLeft: 8,
    padding: "8px 14px",
    background: "#005c4b",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
};
