import { useForm } from "react-hook-form";
import { postData } from "../lib/post";
import { patchData } from "../lib/update";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function RegistrationForm({ setUpdate, entry, information, setEdit }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const categories = [
  //   ...new Set(information.map((book) => book.category).toSorted()),
  // ];

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  // } = useForm();

  // useEffect(() => {
  //   if (entry) {
  //     const { title, author, price, cover, category } = entry;
  //     setValue("title", title);
  //     setValue("author", author);
  //     setValue("price", price);
  //     setValue("cover", cover);
  //     setValue("category", category);
  //   }
  // }, [entry]);

  // const formSubmitHandler = async (data) => {
  //   try {
  //     if (entry) {
  //       await patchData(entry.id, data);
  //       setEdit((prev) => !prev);
  //     } else {
  //       await postData({ ...data, reserved: false });
  //     }

  //     setValue("title", "");
  //     setValue("author", "");
  //     setValue("price", "");
  //     setValue("cover", "");
  //     setUpdate((prev) => prev + 1);
  //     navigate("/");
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // return (
  //   <>
  //     <form
  //       className="flex flex-col w-1/2 m-auto"
  //       noValidate
  //       onSubmit={handleSubmit(formSubmitHandler)}
  //     >
  //       {entry ? (
  //         <h1 className="text-2xl my-2">Book entry editing form:</h1>
  //       ) : (
  //         <h1 className="text-2xl my-2">Book registration form:</h1>
  //       )}

  //       <input
  //         className="inputs"
  //         type="text"
  //         placeholder="Title..."
  //         {...register("title", {
  //           required: "Please enter the title.",
  //           minLength: {
  //             value: 3,
  //             message: "Title must contain at least 3 characters.",
  //           },
  //           maxLength: {
  //             value: 100,
  //             message: "Title can contain a maximum of 100 characters.",
  //           },
  //         })}
  //       />
  //       <p className="text-red-500">{errors.title?.message}</p>
  //       <input
  //         className="inputs"
  //         type="text"
  //         placeholder="Author..."
  //         {...register("author", {
  //           required: "Please enter the author.",
  //           pattern: {
  //             value: /^[a-zA-Z\s]*$/,
  //             message:
  //               "Only letters and spaces are allowed in the 'Author' field.",
  //           },
  //         })}
  //       />
  //       <p className="text-red-500">{errors.author?.message}</p>
  //       <input
  //         className="inputs"
  //         type="text"
  //         placeholder="Price..."
  //         {...register("price", {
  //           required: "Please enter the price.",
  //           min: {
  //             value: 0.01,
  //             message: "Price cannot be set to a negative number or 0",
  //           },
  //           pattern: {
  //             value: /^[0-9]*\.[0-9][0-9]$/,
  //             message:
  //               "Price must be a number (if decimal - max 2 digits after comma).",
  //           },
  //         })}
  //       />
  //       <p className="text-red-500">{errors.price?.message}</p>
  //       <input
  //         className="inputs"
  //         type="text"
  //         placeholder="Cover URL..."
  //         {...register("cover", {
  //           required: "Please enter URL of the cover.",
  //           pattern: {
  //             value:
  //               /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  //             message: "Invalid cover URL.",
  //           },
  //         })}
  //       />
  //       <p className="text-red-500">{errors.cover?.message}</p>
  //       <label htmlFor="category">Select category:</label>
  //       <select
  //         className="inputs"
  //         id="category"
  //         {...register("category", { required: "Category is required." })}
  //       >
  //         <option label=" "></option>
  //         {categories.map((category) => {
  //           return (
  //             <>
  //               <option value={category}>{category}</option>
  //             </>
  //           );
  //         })}
  //       </select>
  //       <p className="text-red-500">{errors.category?.message}</p>
  //       <p className="text-xs">*all fields are mandatory</p>
  //       <input type="submit" className="buttons my-3 w-1/2 self-center" />
  //     </form>

  //     {error && <p>{error}</p>}
    // </>
  // );
}

export default RegistrationForm;
