import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { URL } from "../lib/constants";
import axios from "axios";
import RegistrationCard from "../components/RegistrationCard";
import { useAuth } from "../context/AuthContext";

function TripRegistrationPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`${URL}/api/trips/${id}`, {
          auth: {
            username: user.username,
            password: user.password,
          },
        });

        setTrips(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  if (loading) return <p>Loading trip details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="grid grid-cols-4">
        {trips.map((tripDate) => (
          <RegistrationCard tripDate={tripDate} setTrips={setTrips} />
        ))}
      </div>
    </>
  );
}

export default TripRegistrationPage;
