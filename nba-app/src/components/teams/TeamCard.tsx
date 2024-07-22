import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/teams/teams.module.css";

interface Team {
    name: string;
    full_name: string;
    conference: string;
  }
  
  interface TeamPageProps {
    teams: Team[];
  }

const TeamCard = ({teams}: TeamPageProps) => {
    return (
        <div className={styles.grid}>
        {teams ? (
          teams.map((team) => (
            <Link href={`/teams/${team.name}`} className={styles.link_to_team} key={team.name}>
            <div className={styles.team}>
              <Image
                src={`/teamlogos/${team.name}.png`}
                width={200}
                height={200}
                alt={`Picture of ${team.full_name} logo`}
              />
              <div className={styles.teamItem}>
                <p>{team.full_name}</p>
                <p>{team.conference}</p>
              </div>
            </div>
          </Link>
          ))
        ) : (
          <h1>Loading teams...</h1>
        )}
      </div>
    )
}

export default TeamCard