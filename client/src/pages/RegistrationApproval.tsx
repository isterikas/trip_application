import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { URL } from "../lib/constants";
import Button from "../components/Button";
import { updateStatus } from "../lib/update";

function RegistrationApproval() {
  interface ApprovalItem {
    registrationId: number;
    username: string;
    tripName: string;
    tripDate: Date;
    currentlyBooked: number;
  }

  const [items, setItems] = useState<ApprovalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`${URL}/api/trips/pending`);
        setItems(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="grid grid-cols-4">
        {items.map((item) => (
          <div
            key={item.registrationId}
            className="bg-[#1a8f70] m-3 p-5 flex flex-col rounded border-1 border-black"
          >
            <p>Trip name: {item.tripName}</p>
            <p>Date: {item.tripDate.toString()}</p>
            <p>Username: {item.username}</p>
            <p>{item.currentlyBooked}/20</p>
            <Button
              buttonType={"registration"}
              onClick={() => updateStatus(item.registrationId, "APPROVED")}
            >
              Approve
            </Button>
            <Button
              buttonType={"registration"}
              onClick={() => updateStatus(item.registrationId, "REJECTED")}
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
