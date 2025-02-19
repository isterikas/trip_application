import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import axios from "axios";

function Card({ setUpdate, entry, information }) {
  const [edit, setEdit] = useState(false);

  const reservationHandler = async () => {
    const url = "http://localhost:3000/books";
    const response = await axios.patch(`${url}/${entry.id}`, {
      reserved: !entry.reserved,
    });
    setUpdate((prev) => prev + 1);

    return response;
  };

  return (
    <>
      <div className="grid grid-cols-3">
        <img
          src={entry.cover}
          alt="book cover"
          className="col-start-1 self-center rounded"
        />
        <div className="col-start-2 mx-7 self-center">
          {" "}
          <p className="font-bold text-2xl">{entry.title}</p>
          <p className="text-xl ">{entry.author}</p>
          <p>{`€${entry.price}`}</p>
          <p className="italic">{entry.category}</p>
        </div>
        <div className="col-start-3 m-3 grid grid-cols-1 grid-rows-2 self-center">
          {entry.reserved ? (
            <button
              className="buttons m-3"
              onClick={() => {
                reservationHandler();
              }}
            >
              Return
            </button>
          ) : (
            <button
              className="buttons m-3"
              onClick={() => {
                reservationHandler();
              }}
            >
              Lend
            </button>
          )}

          <button
            className="buttons m-3"
            onClick={() => {
              setEdit((prev) => !prev);
            }}
          >
            Edit
          </button>
        </div>
        {edit && (
          <div className="col-span-3 my-3">
            <RegistrationForm
              setUpdate={setUpdate}
              entry={entry}
              setEdit={setEdit}
              information={information}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Card;
