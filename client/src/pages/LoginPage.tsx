import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [, setLogIn] = useState(false);
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setLogIn(true);
    setError("");
    login(data.username, data.password);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="element-bg p-14 rounded flex flex-col items-center justify-center"
      >
        <h1 className="my-5">Login</h1>
        <input
          className="p-2 my-3 border-1 border-black w-full"
          type="text"
          id="username"
          placeholder="Enter username"
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
          {...register("password", { required: "Can't be empty" })}
        />
        <p className="errors">{errors.username?.message}</p>

        {/* Submit button */}
        <input
          type="submit"
          value="Login to your account"
          className="bg-[#fd9797] text-[#1e2939] hover:bg-[#1c3334] my-5 hover:text-white rounded-xl w-full p-3 transition duration-300"
        />
      </form>
      <p className="my-5">
        Don't have an account?
        <Link to={`/signup`} className="text-[#fd9797] font-bold mx-1">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
