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
  const numRows = 5;
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % tableData.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleItems = () => {
    const endIndex = (startIndex + numRows - 1) % tableData.length;
    if (endIndex >= startIndex) {
      return tableData.slice(startIndex, endIndex + 1);
    } else {
      return [
        ...tableData.slice(startIndex),
        ...tableData.slice(0, endIndex + 1),
      ];
    }
  };

  const visibleItems = getVisibleItems();

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
