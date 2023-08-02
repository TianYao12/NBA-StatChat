import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const [player, setPlayer] = useState("");
  const router = useRouter();
  const playerid = router.query.player;

  useEffect(() => {
    fetchPlayer();
  }, [playerid]);

  const fetchPlayer = async () => {
    try {
      const response = await axios.get(`/api/players/${playerid}`);
      setPlayer(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Link href="/players"> ← Back to players </Link>
      <br />
      <h1>{player.first_name} {player.last_name}</h1>
      <h2>Position</h2>
      <p>{player.position}</p>
    </>
  );
}
