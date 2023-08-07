//Only used for putting players into database 
import axios from "axios";

export default async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.balldontlie.io/api/v1/players?page=32&per_page=100"
    );
    const players = response.data.data;
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch players" });
  }
};

