import { useChat } from "ai/react";
import styles from "../styles/chat.module.css";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className={styles.main}>
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              <p>{m.content}</p>
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className={styles.form}
          value={input}
          placeholder="Ask Anything Basketball?"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
