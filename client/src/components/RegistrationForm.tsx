import { useForm } from "react-hook-form";
import { postTrip } from "../lib/post";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useItemContext } from "../context/ItemContext";
import { putData } from "../lib/update";

const RegistrationForm = ({ entry }) => {
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
    if (!entry) {
      try {
        console.log(data);
        await postTrip(data);
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await putData(entry.id, data);
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (entry) {
      const { name, category, image, duration, price, dates } = entry;
      setValue("name", name);
      setValue("category", category);
      setValue("image", image);
      setValue("duration", duration);
      setValue("price", price);
      setValue("dates", dates);
      console.log(dates);
      console.log(price);
    }
  }, [entry]);

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <form
          className="element-bg p-7 flex flex-col w-9/10 m-auto rounded"
          noValidate
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <h1 className="text-2xl my-2">Trip registration form:</h1>

          <input
            className="my-2 p-1 border-1 border-black rounded"
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
          <p className="errors">{errors.name?.message}</p>
          <label htmlFor="category">Select category:</label>
          <select
            className="my-2 p-1 border-1 border-black rounded"
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
          <p className="errors">{errors.category?.message}</p>
          <input
            className="my-2 p-1 border-1 border-black rounded"
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
          <p className="errors">{errors.image?.message}</p>
          <input
            className="my-2 p-1 border-1 border-black rounded"
            type="text"
            placeholder="Duration..."
            {...register("duration", {
              required: "Please enter the duration.",
            })}
          />
          <p className="errors">{errors.duration?.message}</p>
          <input
            className="my-2 p-1 border-1 border-black rounded"
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
          <p className="errors">{errors.price?.message}</p>
          <input
            className="my-2 p-1 border-1 border-black rounded"
            type="text"
            placeholder="Dates..."
            {...register("dates", {
              required: "Please enter the dates",
              // min: {
              //   value: 0.01,
              //   message: "Price cannot be set to a negative number or 0",
              // },
              pattern: {
                value:
                  /^(?:\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01]))(?:\s*,\s*\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01]))*$/,
                message:
                  "Please write the dates in YYYY-MM-DD format and separated by commas",
              },
            })}
          />
          <p className="errors">{errors.dates?.message}</p>
          <p className="text-xs">*all fields are mandatory</p>
          <input
            type="submit"
            className="buttons my-3 p-2 w-1/3 self-center border-2 border-black rounded font-bold"
          />
        </form>

        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default RegistrationForm;
