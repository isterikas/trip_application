import { useLocation } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
function ItemCreationPage() {
  const location = useLocation();
  const entry = location.state?.entry;

  return (
    <>
      <RegistrationForm entry={entry} />
    </>
  );
}

export default ItemCreationPage;
