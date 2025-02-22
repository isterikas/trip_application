function Button({ buttonType, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`${
        buttonType === "navlinks" ? "m-2 bg-[#414141] hover:bg-[#ccdfcb]" : ""
      } ${
        buttonType === "registration"
          ? "m-2 bg-[#535353] hover:bg-[#ccdfcb]"
          : ""
      }`}
    >
      {children}
    </button>
  );
}
export default Button;
