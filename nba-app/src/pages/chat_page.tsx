// https://www.youtube.com/watch?v=JEBDfGqrAUA 
import { useChat } from "ai/react";
import styles from "../styles/chat.module.css";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className={styles.main}>
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className={styles.convo}>
              {m.role === "user" ? (
                <p className={styles.title}>User: </p>
              ) : (
                <p className={styles.title}>AI: </p>
              )}
              <p>{m.content}</p>
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className={styles.form}
          value={input}
          maxLength={1000}
          placeholder="Shoot your basketball questions!"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
