import { useEffect, useState } from "react";

export default function Home() {
  const [careerPoints, setCareerPoints] = useState("");

  useEffect(() => {
    const fetchCareerPoints = async () => {
      try {
        const response = await fetch("/api/lebron-career-points");
        const data = await response.json();
        setCareerPoints(data.career_Points);
      } catch (error) {
        console.error("Failed to fetch career points:", error);
      }
    };

    fetchCareerPoints();
  }, []);

  return (
    <div>
      LeBron James' career points: {careerPoints}
    </div>
  );
}
