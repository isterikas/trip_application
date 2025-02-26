import { Item } from "../context/ItemContext";
import Button from "./Button";
import { capitalizeFirstLetter } from "../lib/capitalizeFirstLetter";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { deleteItemById } from "../lib/delete";

function ItemCard({ item }: { item: Item }) {
  const { user } = useAuth();
  const deleteItemHandler = () => {
    try {
      deleteItemById(item.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={item.id}
        className="m-3 p-2 rounded flex flex-col justify-center items-center bg-[#1a8f70] shadow-2xs"
      >
        <img
          src={item.image}
          alt="destination picture"
          className="w-100 h-50 rounded object-cover m-2 shadow-sm"
        />
        <p className="font-bold">Destination: {item.name}</p>
        <p>Price: {`€${item.price}`}</p>
        <p className="italic">
          Category: {capitalizeFirstLetter(item.category)}
        </p>
        {item.rating === 0 ? (
          <p>The trip has no ratings yet.</p>
        ) : (
          <p>Rating: {item.rating}</p>
        )}

        {item.available ? (
          <Link to={`/items/${item.id}`}>
            <Button buttonType={"registration"}>See available dates</Button>
          </Link>
        ) : (
          <p className="italic">Currently no dates</p>
        )}
        {user
          ? Object.values(user.roles).includes("ROLE_ADMIN") && (
              <div className="flex">
                <Link to={`/items/${item.id}`}>
                  <Button buttonType={"registration"}>Edit</Button>
                </Link>
                <Button buttonType={"registration"} onClick={deleteItemHandler}>
                  Delete
                </Button>
              </div>
            )
          : ""}
      </div>
    </>
  );
}

export default ItemCard;
