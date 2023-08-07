import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/players.module.css";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
}

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [playerData, setPlayerData] = useState<Player[] | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (playerData && playerData.length > 0) {
      fetchStats(playerData[0].id);
    }
  }, [playerData]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get<Player[]>(
        `/api/players/playerapi?player=${searchQuery}`
      );
      setPlayerData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStats = async (id: number) => {
    try {
      const response = await axios.get<any>(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
      );
      setStats(response.data.data);
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
          placeholder="Search for a player by first name"
          className={styles.searchBar}
        />
        <button onClick={fetchPlayers} className={styles.button}>
          Search
        </button>
      </div>

      {playerData && stats ? (
        <ul>
          <li>
            <strong>ID:</strong> {playerData[0].id}
          </li>
          <li>
            <strong>First Name:</strong> {playerData[0].first_name}
          </li>
          <li>
            <strong>Last Name:</strong> {playerData[0].last_name}
          </li>
          <li>
            <strong>Games Played:</strong>{" "}
            {stats.games_played === null ? stats.games_played : "No Data"}
          </li>
          <li>
            <strong>pts:</strong>{" "}
            {stats.pts === null ? stats.pts : "No Data"}
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
