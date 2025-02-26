import { useForm } from "react-hook-form";
import { postTrip } from "../lib/post";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useItemContext } from "../context/ItemContext";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { items } = useItemContext();

  const categories = [
    ...new Set(items.map((item) => item.category).toSorted()),
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = async (data) => {
    data.dates = data.dates.split(",").map((date) => date.trim());

    try {
      console.log(data);
      await postTrip(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="h-screen">
        <form
          className="flex flex-col w-1/2 m-auto"
          noValidate
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <h1 className="text-2xl my-2">Trip registration form:</h1>

          <input
            className="inputs"
            type="text"
            placeholder="Name..."
            {...register("name", {
              required: "Please enter the name of the trip.",
              minLength: {
                value: 3,
                message: "Name must contain at least 3 characters.",
              },
              maxLength: {
                value: 100,
                message: "Name can contain a maximum of 100 characters.",
              },
            })}
          />
          <p className="text-red-500">{errors.name?.message}</p>
          <label htmlFor="category">Select category:</label>
          <select
            className="inputs"
            id="category"
            {...register("category", {
              required: "Category is required.",
            })}
          >
            <option label=" "></option>
            {categories.map((category) => {
              return (
                <>
                  <option value={category}>{category}</option>
                </>
              );
            })}
          </select>
          <p className="text-red-500">{errors.category?.message}</p>
          <input
            className="inputs"
            type="text"
            placeholder="Image URL..."
            {...register("image", {
              // required: "Please enter URL of the cover.",
              // pattern: {
              //   value:
              //     /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              //   message: "Invalid image URL.",
              // },
            })}
          />
          <p className="text-red-500">{errors.image?.message}</p>
          <input
            className="inputs"
            type="text"
            placeholder="Duration..."
            {...register("duration", {
              required: "Please enter the duration.",
            })}
          />
          <p className="text-red-500">{errors.duration?.message}</p>
          <input
            className="inputs"
            type="text"
            placeholder="Price..."
            {...register("price", {
              required: "Please enter the price.",
              min: {
                value: 0.01,
                message: "Price cannot be set to a negative number or 0",
              },
              pattern: {
                value: /^[0-9]*\.[0-9][0-9]$/,
                message:
                  "Price must be a number (if decimal - max 2 digits after comma).",
              },
            })}
          />
          <p className="text-red-500">{errors.price?.message}</p>
          <input
            className="inputs"
            type="text"
            placeholder="Dates..."
            {...register("dates", {
              required: "Please enter the dates",
              // min: {
              //   value: 0.01,
              //   message: "Price cannot be set to a negative number or 0",
              // },
              // pattern: {
              //   value: /^[0-9]*\.[0-9][0-9]$/,
              //   message:
              //     "Price must be a number (if decimal - max 2 digits after comma).",
              // },
            })}
          />
          <p>{errors.dates?.message}</p>
          <p className="text-xs">*all fields are mandatory</p>
          <input type="submit" className="buttons my-3 w-1/2 self-center" />
        </form>

        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default RegistrationForm;
