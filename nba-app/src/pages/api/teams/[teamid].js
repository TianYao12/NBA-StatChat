import axios from "axios";

export default async function handler(req, res) {
  const { teamid } = req.query;
  try {
    const response = await axios.get(`https://www.balldontlie.io/api/v1/teams/${teamid}`);
    const team = response.data;
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams' });
  }
};
