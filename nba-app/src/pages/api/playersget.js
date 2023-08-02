import axios from "axios";

export default async (req, res) => {
  try {
    const response = await axios.get("https://www.balldontlie.io/api/v1/players");
    const players = response.data.data;
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch players' });
  }
};

//so to me this process seems to be putting it into json so that it can be seen on a page
//for troubleshooting?
