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

export const deleteDuplicatePlayers = async () => {
  const mongoClient = await clientPromise;
  const collection = mongoClient.db("nba").collection("players");

  // Find duplicate players based on specific criteria (first_name, last_name, position)
  const duplicatePlayers = await collection
    .aggregate([
      {
        $group: {
          _id: {
            first_name: "$first_name",
            last_name: "$last_name",
            position: "$position",
          },
          ids: { $push: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 }, // Filter only duplicates (count greater than 1)
        },
      },
    ])
    .toArray();

  // Delete duplicate players (keeping only one of each unique player)
  for (const duplicate of duplicatePlayers) {
    const [keepId, ...deleteIds] = duplicate.ids; // Keep the first ID and delete the rest
    await collection.deleteMany({ _id: { $in: deleteIds } });
  }

  return duplicatePlayers.length; // Return the number of deleted duplicates
};

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const { team } = req.query; // Get the dynamic team name from the query parameters
      const mongoClient = await clientPromise;
      const players = await mongoClient
        .db("nba")
        .collection("players")
        .find({
          "team.full_name": team,
          position: { $ne: "" },
        })
        .toArray();
      res.status(200).json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch players" });
    }
  } else if (req.method === "POST") {
    try {
      const response = req.body;
      await addPlayers(response); // Insert players directly into the database here
      res.status(200).json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to add players" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedCount = await deleteDuplicatePlayers();
      res
        .status(200)
        .json({ message: `Deleted ${deletedCount} duplicate players` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to delete duplicate players" });
    }
  }
};
