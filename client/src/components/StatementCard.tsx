import { Item } from "../context/ItemContext";
import Button from "./Button";
import { capitalizeFirstLetter } from "../lib/capitalizeFirstLetter";
import { Link } from "react-router";

function StatementCard({ entry }) {
  const date = new Date(entry.date);
  const today = new Date();
  return (
    <>
      <div
        key={entry.id}
        className="m-3 p-2 rounded flex flex-col justify-center items-center bg-green-400"
      >
        <p>{entry.name}</p>
        <p>{entry.date}</p>
        {date < today ? (
          <>
            <p>{entry.comment}</p>
            <p>{entry.rating}</p>{" "}
          </>
        ) : (
          <p>{entry.status}</p>
        )}
      </div>
    </>
  );
}

export default StatementCard;
