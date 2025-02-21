import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

const LogInPage = () => {
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
      {/* Icon */}
      <div className="flex flex-col place-items-center h-dvh">
        <div className="pb-[3.65rem] pt-[3rem] tablet:pt-[4.97rem] tablet:pb-[4.5rem] desktop:pt-[4.9rem] desktop:pb-[5.19rem] "></div>

        {/* Form */}
        <div className="bg-semi-dark-blue w-[20.4375rem] h-[22.8125rem] rounded-[0.63rem] tablet:w-[25rem] tablet:h-[23.3125rem] tablet:rounded-[1.25rem] ">
          <h1 className="heading-l pl-[1.5rem] pt-[1.2rem] pb-[2.1rem] tablet:pl-[2rem] tablet:pt-[1.7rem] desktop:pt-[1.6rem]">
            Login
          </h1>
          {/* While submitting the form, calls "onSubmit" function */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" pl-[1.5rem] tablet:pl-[2rem]"
          >
            {/* Username input window */}
            <div className="pb-[1.3rem]">
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                {...register("username", {
                  required: "Can't be empty",
                })}
                // If the error occurs, sets input border red
                // Tailwind autofill class, leaves original CSS
                // Calls setError state to remove the error when user starts typing
                className={`bg-semi-dark-blue border-0 border-b-[0.063rem] pb-7 pl-[1rem] tablet:w-[21rem] autofill:transition-colors autofill:duration-[999999999s] hover:opacity-100 hover:border-b-white form-input ${
                  errors.email ? "border-red" : "greyish-blue"
                }`}
                onInput={() => setError("")}
              />
              {/* Separation of errors by checking their type and placing them differently*/}
              <div className="relative">
                {errors.email?.type === "required" && (
                  <p className="error-text text-red absolute bottom-[1.15rem] left-[10.84rem] tablet:left-[14.44rem]">
                    Can`t be empty
                  </p>
                )}
              </div>
              <div className="relative">
                {errors.email?.type === "pattern" && (
                  <p className="error-text text-red absolute top-[0.1rem] left-[0.5rem]">
                    Invalid email address
                  </p>
                )}
              </div>
            </div>

            {/* Password input window */}
            <div className="pb-[2.45rem] desktop:pb-[2.5rem]">
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", { required: "Can't be empty" })}
                className={`bg-semi-dark-blue border-0 border-b-[0.063rem] pb-7 pl-[1rem] tablet:w-[21rem] autofill:transition-colors autofill:duration-[999999999s] hover:opacity-100 hover:border-b-white form-input ${
                  errors.password ? "border-red" : "greyish-blue"
                }`}
                onInput={() => setError("")}
              />
              <div className="relative">
                <p className="error-text text-red absolute bottom-[1.15rem] left-[10.84rem] tablet:left-[14.44rem]">
                  {errors.password?.message}
                </p>
              </div>
              <div className="relative">
                {/* Shows errors coming from error state */}
                {error && (
                  <p className="error-text text-red absolute pl-[1.06rem] top-[0.1rem]">
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-red text-white body-m rounded-[0.375rem] w-[17.438rem] h-[3rem] hover:bg-white hover:text-semi-dark-blue hover:duration-500 tablet:w-[21rem]"
            >
              Login to your account
            </button>
          </form>
          <p className="body-m pl-[3.5rem] pt-[1.4rem] tablet:pl-[5.75rem]">
            Don`t have an account?{" "}
            <Link to={`/signup`} className="text-red body-m mx-[0.3rem]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
