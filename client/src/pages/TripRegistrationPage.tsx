import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { URL } from "../lib/constants";
import axios from "axios";
import RegistrationCard from "../components/RegistrationCard";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "./LoadingPage";

function TripRegistrationPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`${URL}/api/trips/${id}`, {
          auth: {
            username: user.username,
            password: user.password,
          },
        });

        setItems(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) return <LoadingPage />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="grid grid-cols-4">
        {items.map((itemDate) => (
          <RegistrationCard
            key={itemDate.id}
            itemDate={itemDate}
            setItems={setItems}
          />
        ))}
      </div>
    </>
  );
}

export default TripRegistrationPage;
