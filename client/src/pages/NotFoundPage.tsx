import { useNavigate } from "react-router";
import Button from "../components/Button";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-center items-center my-16">
        <h1 className="uppercase font-bold text-5xl my-10">
          404 page not found
        </h1>
        <Button
          buttonType={"navlinks"}
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </Button>
      </div>
    </>
  );
}

export default NotFoundPage;
