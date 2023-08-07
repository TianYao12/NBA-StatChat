import clientPromise from "../../../../lib/mongodb";
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { player } = req.query; // Get the dynamic team name from the query parameters
    const [first_name, last_name] = player.split(" ");
    const mongoClient = await clientPromise;
    // Split the player string into first name and last name
    const players = await mongoClient
      .db("nba")
      .collection("players")
      .find({
        first_name: first_name,
        last_name: last_name,
      })
      .toArray();

    res.status(200).json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch players" });
  }
}
