import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-center items-center my-16">
        <h1 className="uppercase font-bold text-5xl my-10">
          404 page not found{" "}
        </h1>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="buttons my-5"
        >
          Go back
        </button>
      </div>
    </>
  );
}

export default NotFound;
