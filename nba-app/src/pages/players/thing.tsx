import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get<Player[]>("/api/playersget");
      setPlayers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h1>NBA Players</h1>
      {players.length > 0 ? (
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              <Link href={`/players/${player.id}`}>
                {player.first_name} {player.last_name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h1>Loading players...</h1>
      )}
    </div>
  );
  
}
{
  /* THIS WOULD BE TO ITERATE THROUGH ENTIRE JSON
   {Object.entries(player).map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong> {value}
      </li>
  ))} */
}
