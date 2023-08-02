import { useState } from "react";
import {axios} from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState("");

  const fetchItems = async () => {
    const response = await fetch("/api/activities");
    const info = await response.json();
    setData(info);
  };

  const addItems = async () => {
    const response = await fetch("/api/activities", {
      method: "POST",
      body: JSON.stringify({ singleData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await response.json();
  };

  return (
    <>
      <title>To-do list</title>
      <p>to-do list</p>

      <input
        onChange={(e) => {
          setSingleData(e.target.value);
        }}
      />
      <button onClick={addItems}>Submit</button>
      
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={fetchItems}
      >
        Fetch items
      </button>
      {data ? (
        data.map((data) => (
          <div key={data.id}>
            <p>
              {data.id} {data.description}
            </p>
            {/* <button
            onClick={() => {
              deleteItem;
            }}
          >
            Delete
          </button> */}
          </div>
        ))
      ) : (
        <p>data not rendered!</p>
      )}
    </>
  );
}

async function deleteItem() {}
