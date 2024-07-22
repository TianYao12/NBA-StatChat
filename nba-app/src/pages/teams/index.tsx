import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import TeamCard from "@/components/teams/TeamCard";
import styles from "../../styles/teams/teams.module.css";

/**
 TeamPage(teams) displays all NBA teams 
 It calls the Next.js API in the getServerSideProps function to render data at request time
 */
export default function TeamPage({ teams }: TeamPageProps) {

  return (
    <div>
      <div className={styles.title}>
        <h1>NBA Teams</h1>
      </div>
      <TeamCard teams={teams}/>
    </div>
  );
}

// getServerSideProps(context) renders the NBA teams at request time (would've done with getStaticProps but couldn't get it to work with sessions)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  try { 
    // get all teams from Next.js API
    const response = await axios.get(
      "http://localhost:3000/api/teams/teamsapi"
    );
    const teams = response.data;

    return {
      props: {
        teams,
        session,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        teams: [],
        session,
      },
    };
  }
};

{
  /* THIS WOULD BE TO ITERATE THROUGH ENTIRE JSON
   {Object.entries(player).map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong> {value}
      </li>
  ))} */
}
