import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { URL } from "../lib/constants";
import StatementCard from "../components/StatementCard";
import LoadingPage from "./LoadingPage";

function MyItemsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`${URL}/api/trips/my`, {
          auth: {
            username: user.username,
            password: user.password,
          },
        });
        console.log("Fetched trips:", response.data);

        setItems(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        console.log(items);
      }
    };

    fetchTripDetails();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
        {!error &&
          items.map((item) => <StatementCard key={item.id} item={item} />)}
        {error && <div>error</div>}
        {loading && <div>loading ...</div>}
      </div>
    </>
  );
}

export default MyItemsPage;
