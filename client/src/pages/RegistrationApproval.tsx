import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { URL } from "../lib/constants";
import Button from "../components/Button";
import { updateStatus } from "../lib/update";

function RegistrationApproval() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`${URL}/api/trips/pending`);
        setTrips(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, []);

  if (loading) return <p>Loading trip details...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="grid grid-cols-4">
        {trips.map((request) => (
          <div className="bg-green-400 m-3 p-2 flex flex-col">
            <p>Trip name: {request.tripName}</p>
            <p>Date: {request.tripDate}</p>
            <p>Username: {request.username}</p>
            <p>{request.currentlyBooked}/20</p>
            <Button
              buttonType={"registration"}
              onClick={() => updateStatus(request.registrationId, "APPROVED")}
            >
              Approve
            </Button>
            <Button
              buttonType={"registration"}
              onClick={() => updateStatus(request.registrationId, "REJECTED")}
            >
              Reject
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

export default RegistrationApproval;
