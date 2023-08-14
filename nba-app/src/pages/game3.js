import { useState, useEffect } from "react";
import styles from "../styles/games.module.css";
import axios from "axios";

export default function App() {
  const numRows = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/staticdata");
      setTableData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % tableData.length);
    }, 4000); /* changed interval time to 2 seconds */

    return () => clearInterval(interval);
  }, [tableData]);

  const getVisibleItems = () => {
    const endIndex = (startIndex + numRows) % tableData.length;
    const items =
      endIndex >= startIndex
        ? tableData.slice(startIndex, endIndex)
        : [...tableData.slice(startIndex), ...tableData.slice(0, endIndex)];

    return items;
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
            <tr
              key={`${index}_${row.airport}_${row.airline}`} // Adding a unique key
              className={`${styles.row} ${styles.flip}`} // Apply flip class
              style={{
                backgroundColor: index % 2 === 0 ? "white" : "#f2f2f2",
              }}
            >
              <td>{row.airport || ""}</td>
              <td>{row.airline || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
