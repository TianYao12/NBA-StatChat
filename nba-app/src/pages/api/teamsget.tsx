import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get("https://www.balldontlie.io/api/v1/teams");
    const teams = response.data.data;
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams' });
  }
}
