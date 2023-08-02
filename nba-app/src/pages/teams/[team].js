import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../../styles/teams/team.module.css";

export default function Page() {
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { team: teamId } = router.query;

  useEffect(() => {
    fetchTeam();
    fetchPlayers();
  }, [teamId]);

  const fetchTeam = async () => {
    try {
      const response = await axios.get(`/api/teams/${teamId}`);
      setTeam(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("https://www.balldontlie.io/api/v1/players");
      setPlayers(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(players)
  return (
    <>
      <div className={styles.underline}>
        <a href="/teams">← Back to teams</a>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            {team && (
              <>
                <Image
                  src={`/teamlogos/${team.name}.png`}
                  width={100}
                  height={100}
                  alt="Team Logo"
                />
                <br />
                <h1>{team.full_name}</h1>
                <h2>Conference</h2>
                <p>{team.conference}</p>
                <h2>Division</h2>
                <p>{team.division}</p>
              </>
            )}
          </div>
          <div className={styles.right}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>PLAYER</th>
                  <th>POSITION</th>
                  <th>HEIGHT</th>
                  <th>WEIGHT</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id}>
                    <td>{player.first_name} {player.last_name}</td>
                    <td>{player.position}</td>
                    <td>{player.height_feet}'{player.height_inches}"</td>
                    <td>{player.weight_pounds} lbs</td>
                    <td>{player.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
