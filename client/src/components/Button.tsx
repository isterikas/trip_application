function Button({ buttonType, onClick, children, loading }) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`shadow-sm ${
        buttonType === "navlinks"
          ? "m-2 bg-[#fd9797] text-gray-800 hover:bg-[#ccdfcb] font-bold"
          : ""
      } ${
        buttonType === "registration"
          ? "m-2 bg-[#92c7b4] text-gray-800 hover:bg-[#ccdfcb]"
          : ""
      }
      ${loading && "cursor-not-allowed opacity-50"}`}
    >
      {children}
    </button>
  );
}
export default Button;
