function Button({ buttonType, onClick, children, loading }) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`hover:bg-[#1c3334] hover:text-white shadow-sm ${
        buttonType === "navlinks" && "m-2 bg-[#fd9797] font-bold"
      } ${buttonType === "registration" && "m-2 bg-[#92c7b4]"} ${
        buttonType === "menu" && "m-2 bg-[#c7bb92] w-9/10"
      }
      ${loading && "cursor-not-allowed opacity-50"}`}
    >
      {children}
    </button>
  );
}
export default Button;
