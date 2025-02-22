import { Item } from "../context/ItemContext";
import Button from "./Button";
import { capitalizeFirstLetter } from "../lib/capitalizeFirstLetter";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Card({ entry }: { entry: Item }) {
  const { user } = useAuth();
  return (
    <>
      <div
        key={entry.id}
        className="m-3 p-2 rounded flex flex-col justify-center items-center bg-green-400"
      >
        <img
          src={entry.image}
          alt="destination picture"
          className="w-100 h-50 rounded object-cover m-2"
        />
        <p className="font-bold">Destination: {entry.name}</p>
        <p>Price: {`€${entry.price}`}</p>
        <p className="italic">
          Category: {capitalizeFirstLetter(entry.category)}
        </p>
        {entry.rating === 0 ? (
          <p>The trip has no ratings yet.</p>
        ) : (
          <p>Rating: {entry.rating}</p>
        )}

        {entry.available ? (
          <Link to={`/items/${entry.id}`}>
            <Button buttonType={"registration"}>See available dates</Button>
          </Link>
        ) : (
          <p className="italic">Currently no dates</p>
        )}
        {user
          ? Object.values(user.roles).includes("ROLE_ADMIN") && (
              <div className="flex">
                <Link to={`/items/${entry.id}`}>
                  <Button buttonType={"registration"}>Edit</Button>
                </Link>
                <Link to={`/items/${entry.id}`}>
                  <Button buttonType={"registration"}>Delete</Button>
                </Link>
              </div>
            )
          : ""}
      </div>
    </>
  );
}

export default Card;
