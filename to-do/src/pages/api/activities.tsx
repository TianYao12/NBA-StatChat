import { items } from "../../files/items";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(items);
  } else if (req.method === "POST") {
    const singleData = req.body.singleData;
    const newData = { id: 4, description: singleData };
    items.push(newData);
    res.status(201).json(newData);
  }
}
