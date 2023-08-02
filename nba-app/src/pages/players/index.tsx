import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/players.module.css";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  weight_pounds: number;
}

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const fetchPlayers = async () => {
    try {
      const response = await axios.get<Player>(
        `https://www.balldontlie.io/api/v1/players/${searchQuery}`
      );
      setPlayerData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(playerData);
  return (
    <>
      <div className={styles.search}>
        <h2>Search for NBA Player</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search for a player"
          className={styles.searchBar}
        />
        <button onClick={fetchPlayers} className={styles.button}>
          Search
        </button>
      </div>

      {playerData ? (
        <ul>
          <li>
            <strong>ID:</strong> {playerData.id}
          </li>
          <li>
            <strong>First Name:</strong> {playerData.first_name}
          </li>
          <li>
            <strong>Last Name:</strong> {playerData.last_name}
          </li>
          <li>
            <strong>Weight:</strong> {playerData.weight_pounds}
          </li>
        </ul>
      ) : null}

      {/* This also works:
       {playerData ? (
        <ul>
          {Object.entries(playerData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      ) : (
        <h1>Loading players...</h1>
      )} */}
    </>
  );
}
