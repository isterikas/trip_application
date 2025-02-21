import { Link } from "react-router";

function Navbar() {
  return (
    <>

        <nav className="flex justify-between element-bg">
          <div>
          <Link to="/">
            <button className="navlinks m-2">Items</button>
          </Link>
          <Link to="/my-items">
          <button className="navlinks m-2">My Items</button>
          </Link>
          <Link to="/registration">
            <button className="navlinks m-2">Item registration</button>
          </Link>
          </div>
          <div>
          <button className="navlinks m-2">Log in</button>
            <button className="navlinks m-2">Sign up</button>
          </div>
        </nav>
    </>
  );
}

export default Navbar;
