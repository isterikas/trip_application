import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { URL } from "../lib/constants";

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
      {trips.map((request) => (
        <div>
          <p>{request.tripName}</p>
          <p>{request.currentlyBooked}/20</p>
        </div>
      ))}
    </>
  );
}

export default RegistrationApproval;
