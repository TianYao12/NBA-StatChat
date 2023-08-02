import clientPromise from "../../../../lib/mongodb";
import axios from "axios";

export const addPlayers = async (players) => {
  const mongoClient = await clientPromise;
  const response = await mongoClient
    .db("nba")
    .collection("players")
    .insertMany(players);
  return response.insertedIds;
};

export const deletePlayers = async () => {
  const mongoClient = await clientPromise;
  const result = await mongoClient
    .db("nba")
    .collection("players")
    .deleteMany({});
  return result.deletedCount;
};

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const mongoClient = await clientPromise;
      const players = await mongoClient
        .db("nba")
        .collection("players")
        .find({})
        .toArray();
      res.status(200).json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch players" });
    }
  } else if (req.method === "POST") {
    try {
      const response = await axios.get(
        "https://www.balldontlie.io/api/v1/players"
      );
      const players = response.data.data;
      const insertedIds = await addPlayers(players);
      res.status(200).json(insertedIds);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to add players" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedCount = await deletePlayers();
      res.status(200).json({ message: `Deleted ${deletedCount} players` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to delete players" });
    }
  }
};
