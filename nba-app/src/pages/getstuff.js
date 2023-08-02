import axios from "axios";
import { useState, useEffect } from "react";

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("/api/playersget");
      const post = await axios.post("/api/players/playersapi", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return null;
};

export default PlayersPage;
