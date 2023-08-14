import axios from "axios";

export default async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/lebron-career-points"
    );
    const careerPoints = response.data.career_points;
    res.status(200).json({ careerPoints });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch career points" });
  }
};
