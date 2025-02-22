import Button from "./Button";
import axios from "axios";
import { postRegistration } from "../lib/post";
import { useAuth } from "../context/AuthContext";

function RegistrationCard({ tripDate }) {
  const { user } = useAuth();
  return (
    <>
      <div
        key={tripDate.id}
        className="bg-green-500 m-3 p-3 rounded flex justify-around items-center"
      >
        <div>
          <p>{tripDate.date}</p>
          <p>{tripDate.tripName}</p>
        </div>
        <Button
          buttonType={"registration"}
          onClick={() => postRegistration(tripDate.id, user)}
        >
          Register
        </Button>
      </div>
    </>
  );
}
export default RegistrationCard;
