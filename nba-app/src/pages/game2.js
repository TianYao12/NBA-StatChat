import { useState, useEffect } from "react";
import styles from "../styles/games.module.css";

const tableData = [
  { airport: "1", airline: "1" },
  { airport: "2", airline: "2" },
  { airport: "3", airline: "3" },
  { airport: "4", airline: "4" },
  { airport: "5", airline: "5" },
  { airport: "6", airline: "6" },
  { airport: "7", airline: "7" },
  { airport: "8", airline: "8" },
  { airport: "9", airline: "9" },
  { airport: "10", airline: "10" },
  { airport: "11", airline: "11" },
];

export default function App() {
  const [visibleItems, setVisibleItems] = useState(tableData.slice(0, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleItems((prevItems) => {
        const nextIndex = tableData.indexOf(prevItems[4]) + 1;
        let nextItems = tableData.slice(nextIndex, nextIndex + 5);
        while (nextItems.length < 5) {
          nextItems = [...nextItems, ...tableData.slice(0, 5 - nextItems.length)];
        }
        return nextItems;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>NBA Games</h1>
      <table className={styles.infoTable}>
        <thead>
          <tr>
            <th>Home</th>
            <th>Away</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((row, index) => (
            <tr key={index} className={styles.row}>
              <td>{row.airport || ""}</td>
              <td>{row.airline || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
