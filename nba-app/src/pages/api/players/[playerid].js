import axios from "axios";

export default async function handler(req, res) {
  const { playerid } = req.query;
  try {
    const response = await axios.get(`https://www.balldontlie.io/api/v1/players/${playerid}`);
    const player = response.data;
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch players' });
  }
};
