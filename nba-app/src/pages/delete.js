import axios from "axios";
import { useState, useEffect } from "react";

const TeamsPage = () => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete("/api/players/playersapi");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Teams</button>
    </div>
  );
};

export default TeamsPage;
