import { useState, useEffect } from "react";
import styles from "../styles/airport.module.css";

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
        const nextItems = tableData.slice(nextIndex, nextIndex + 5);
        const remainingEmptyRows = 5 - nextItems.length;
        const emptyRows = new Array(remainingEmptyRows).fill({});
        return [...nextItems, ...emptyRows];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Airport and Airline Info</h1>
      <table className={styles.infoTable}>
        <thead>
          <tr>
            <th>Airport</th>
            <th>Airline</th>
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
