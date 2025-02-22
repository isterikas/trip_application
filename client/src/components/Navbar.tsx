import { Link } from "react-router";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="flex justify-between element-bg">
        <div>
          <Link to="/">
            <Button buttonType={"navlinks"}>Home</Button>
          </Link>
          <Link to="/about-us">
            <Button buttonType={"navlinks"}>About Us</Button>
          </Link>
          <Link to="/items">
            <Button buttonType={"navlinks"}>Items</Button>
          </Link>
          {user ? (
            <Link to="/my-items">
              <Button buttonType={"navlinks"}>My items</Button>
            </Link>
          ) : (
            ""
          )}

          {user &&
            user.roles &&
            Object.values(user.roles).includes("ROLE_ADMIN") && (
              <>
                <Link to="/registration">
                  <Button buttonType={"navlinks"}>Item registration</Button>
                </Link>
                <Link to="/registration-approval">
                  <Button buttonType={"navlinks"}>Registration approval</Button>
                </Link>
              </>
            )}
        </div>
        {user ? (
          <>
            <div className="flex items-center font-bold">
              <p>welcome {user.username}!</p>
              <Link to="/">
                <Button buttonType={"navlinks"} onClick={logout}>
                  Log out
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div>
            <Link to="/login">
              <Button buttonType={"navlinks"}>Log In</Button>
            </Link>
            <Link to="/signup">
              <Button buttonType={"navlinks"}>Sign Up</Button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
