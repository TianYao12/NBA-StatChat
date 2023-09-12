import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/player.module.css";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

export default function Player() {
  const [player, setPlayer] = useState(null);
  const [pic, setPic] = useState(null);
  const router = useRouter();
  const { player: playerName } = router.query;

  useEffect(() => {
    if (playerName) {
      fetchPlayer(playerName);
    }
  }, [playerName]);

  useEffect(() => {
    if (playerName) {
      fetchPlayerImage(playerName);
    }
  }, [playerName]);

  const fetchPlayer = async (name) => {
    try {
      const response = await axios.get(`/api/players/playerapi?player=${name}`);
      setPlayer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayerImage = async (name) => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/alexnoob/BasketBall-GM-Rosters/master/player-photos.json"
      );
      const playerImages = response.data;

      const playerKey = getKey(name);

      if (playerImages[playerKey]) {
        setPic(playerImages[playerKey]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getKey = (fullName) => {
    const nameParts = fullName.split(" ");

    const firstName = nameParts[0];
    const lastName = nameParts[1];

    const abbreviatedFirstName = firstName.slice(0, 2).toLowerCase();
    const abbreviatedLastName = lastName.slice(0, 5).toLowerCase();

    const playerKey = `${abbreviatedLastName}${abbreviatedFirstName}01`;
    return playerKey;
  };

  const chartLabels = player ? player.map((data) => data.Year) : [];

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "PPG",
        data: player ? player.map((data) => data.PTS / data.GP) : [], // Add a conditional check here
        borderColor: "#cb0c9f",
        borderWidth: 3,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#f797e1");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "PPG",
          padding: {
            bottom: 10,
          },
          font: {
            size: 30,
            style: "italic",
            family: "Arial",
          },
        },
        min: 0,
      },
      x: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Month",
          padding: {
            top: 10,
          },
          font: {
            size: 30,
            style: "italic",
            family: "Arial",
          },
        },
      },
    },
  };

  return (
    <>
      <Link href="/players"> ← Back to players </Link>
      <div className={styles.main}>
        {pic && <img src={pic} alt="Player" style={{ width: "300px" }} />}
        <div className={styles.right}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>PLAYER</th>
                <th>Year</th>
                <th>Season Type</th>
                <th>GP</th>
                <th>MIN</th>
                <th>FG_PCT</th>
                <th>PPG</th>
                <th>APG</th>
                <th>RPG</th>
              </tr>
            </thead>
            <tbody>
              {player
                ? player.map((player) => (
                    <tr key={player.id}>
                      <td>
                        <a href={`/players/${player.PLAYER}`}>
                          {player.PLAYER}
                        </a>
                      </td>
                      <td>{player.Year}</td>
                      <td>{player.Season_type}</td>
                      <td>{player.GP}</td>
                      <td>{player.MIN}</td>
                      <td>{player.FG_PCT}</td>
                      <td>{(player.PTS / player.GP).toFixed(1)}</td>
                      <td>{(player.AST / player.GP).toFixed(1)}</td>
                      <td>{(player.REB / player.GP).toFixed(1)}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>

        {player ? (
          <>
            <div>
              <h1>{playerName} Statistics</h1>
              <div
                style={{
                  width: "900px",
                  height: "400px",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <Line data={data} options={options}></Line>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
