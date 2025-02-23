import Button from "./Button";
import { postRegistration } from "../lib/post";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useSnackbar } from "../context/SnackbarProvider";

function RegistrationCard({ tripDate, setTrips }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  async function handleRegistration() {
    setLoading(true);

    const response = await postRegistration(tripDate.id, user);

    if (!response.ok) {
      setLoading(false);
      showSnackbar("Ups, something went wrong", "error");
      return;
    }

    setTrips((prev) => prev.filter((trip) => trip.id !== response.data.id));
    showSnackbar("Action successful", "success");
    setLoading(false);
  }

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
          onClick={handleRegistration}
          loading={loading}
        >
          {loading ? "Loading ..." : "Register"}
        </Button>
      </div>
    </>
  );
}
export default RegistrationCard;
