import { Link } from "react-router";

function Navbar() {
  return (
    <>
      <div>
        <nav className="w-full flex justify-start bg-teal-500 ">
          <Link to="/">
            <button className="navlinks">Books</button>
          </Link>
          <Link to="/registration">
            <button className="navlinks">Book registration</button>
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
