import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../../styles/teams/team.module.css";
import teamMappings from "../../../public/teams.json";

/**
 * Team() displays the statistics of players playing this team
 * Users can filter players' statistics by year from 2012-13 to 2021-22 and 
 * season type (Regular Season or Playoffs)
 */
export default function Team() {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2012-13");
  const [selectedSeasonType, setSelectedSeasonType] =
    useState("Regular%20Season");

  const router = useRouter();
  const { team } = router.query as { team: string };

  useEffect(() => {
    if (team) {
      fetchData();
    }
  }, [team]);

  const fetchData = async () => {
    try {
      // takes full name of team and gets short form (in database it is in short form)
      const mappedTeam = teamMappings[team]; 
      if (!mappedTeam) {
        console.error("No mapping found for team:", team);
        setIsLoading(false);
        return;
      }
      // call Next.js API for getting data for team
      const response = await axios.get(
        `/api/teams/teamapi?team=${encodeURIComponent(mappedTeam)}`
      );
      setPlayers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  if (!team) {
    return <div>Loading...</div>; // Handle the case when team is not available
  }

  return (
    <>
      <div className={styles.underline}>
        <a href="/teams">← Back to teams</a>
      </div>
      <div className={styles.filterMenu}>
        <label htmlFor="yearFilter">Filter by Year:</label>
        <select
          id="yearFilter"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
          className={styles.choose}
        >
          <option value="2012-13">2012-13</option>
          <option value="2013-14">2013-14</option>
          <option value="2014-15">2014-15</option>
          <option value="2015-16">2015-16</option>
          <option value="2016-17">2016-17</option>
          <option value="2017-18">2017-18</option>
          <option value="2018-19">2018-19</option>
          <option value="2019-20">2019-20</option>
          <option value="2020-21">2020-21</option>
          <option value="2021-22">2021-22</option>
        </select>
        <label htmlFor="seasonTypeFilter">Filter by Season Type:</label>
        <select
          id="seasonTypeFilter"
          onChange={(e) => setSelectedSeasonType(e.target.value)}
          value={selectedSeasonType}
          className={styles.choose}
        >
          <option value="Regular%20Season">Regular Season</option>
          <option value="Playoffs">Playoffs</option>
        </select>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            {
              <>
                <Image
                  src={`/teamlogos/${team.toLowerCase()}.png`}
                  width={100}
                  height={100}
                  alt="Team Logo"
                />
                <br />
                <a href={`https://www.nba.com/${team}`} className={styles.link}>
                  {team}
                  <p className={styles.float}>Visit this team's website</p>
                </a>
              </>
            }
          </div>
          
          {/* Table */}
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
                {players
                  .filter(
                    (player) =>
                      player.Year === selectedYear &&
                      player.Season_type === selectedSeasonType
                  )
                  .map((player) => (
                    <tr key={player.id}>
                      <td>
                        <a href={`/players/${player.PLAYER}`}>
                          {player.PLAYER}
                        </a>
                      </td>
                      <td>{player.Year}</td>
                      <td>{player.Season_type == "Regular%20Season"? "Regular Season" : player.Season_type}</td>
                      <td>{player.GP}</td>
                      <td>{player.MIN}</td>
                      <td>{player.FG_PCT}</td>
                      <td>{(player.PTS / player.GP).toFixed(1)}</td>
                      <td>{(player.AST / player.GP).toFixed(1)}</td>
                      <td>{(player.REB / player.GP).toFixed(1)}</td>
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
