import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const { registerUser } = useAuth();

  const onSubmit = async (data) => {
    registerUser(data.username, data.password);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="element-bg p-14 rounded flex flex-col items-center justify-center"
      >
        <h1 className="my-5">Sign Up</h1>
        <input
          className="p-2 my-3 border-1 border-black w-full"
          type="text"
          id="username"
          placeholder="Username"
          onInput={() => setError("")}
          {...register("username", {
            required: "Can't be empty",
          })}
        />

        <p className="errors">{errors.username?.message}</p>

        <input
          className="p-2 my-3 border-1 border-black w-full"
          type="password"
          id="password"
          placeholder="Password"
          onInput={() => setError("")}
          {...register("password", {
            required: "Can't be empty",
          })}
        />
        <p className="errors">{errors.password?.message}</p>

        {/* Submit button */}
        <input
          type="submit"
          value="Create an account"
          className="bg-[#fd9797] text-[#1e2939] hover:bg-[#1c3334] my-5 hover:text-white rounded-xl w-9/10 p-3 transition duration-300"
        />
      </form>
      <p className="my-5">
        Already have an account?
        <Link to={`/login`} className="text-[#fd9797] font-bold mx-1">
          Login
        </Link>{" "}
      </p>
    </>
  );
};

export default SignUpPage;
