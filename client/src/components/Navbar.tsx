import { Link } from "react-router";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="main-bg shadow-2xs">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="hidden md:flex space-x-2">
            <Link to="/">
              <Button buttonType={"navlinks"}>Home</Button>
            </Link>
            <Link to="/about-us">
              <Button buttonType={"navlinks"}>About Us</Button>
            </Link>
            <Link to="/items">
              <Button buttonType={"navlinks"}>Items</Button>
            </Link>
            {user && (
              <Link to="/my-items">
                <Button buttonType={"navlinks"}>My items</Button>
              </Link>
            )}
            {user &&
              user.roles &&
              Object.values(user.roles).includes("ROLE_ADMIN") && (
                <>
                  <Link to="/registration">
                    <Button buttonType={"navlinks"}>Item registration</Button>
                  </Link>
                  <Link to="/registration-approval">
                    <Button buttonType={"navlinks"}>
                      Registration approval
                    </Button>
                  </Link>
                </>
              )}
          </div>
        </div>
        <div className="hidden md:flex items-center font-bold space-x-2">
          {user ? (
            <>
              <Link to="/">
                <Button buttonType={"navlinks"} onClick={logout}>
                  Log out
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button buttonType={"navlinks"}>Log In</Button>
              </Link>
              <Link to="/signup">
                <Button buttonType={"navlinks"}>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 px-4 pb-4">
          <Link to="/">
            <Button buttonType={"menu"} onClick={toggleMenu}>
              Home
            </Button>
          </Link>
          <Link to="/about-us">
            <Button buttonType={"menu"} onClick={toggleMenu}>
              About Us
            </Button>
          </Link>
          <Link to="/items">
            <Button buttonType={"menu"} onClick={toggleMenu}>
              Items
            </Button>
          </Link>
          {user && (
            <Link to="/my-items">
              <Button buttonType={"menu"} onClick={toggleMenu}>
                My items
              </Button>
            </Link>
          )}
          {user &&
            user.roles &&
            Object.values(user.roles).includes("ROLE_ADMIN") && (
              <>
                <Link to="/registration">
                  <Button buttonType={"menu"} onClick={toggleMenu}>
                    Item registration
                  </Button>
                </Link>
                <Link to="/registration-approval">
                  <Button buttonType={"menu"} onClick={toggleMenu}>
                    Registration approval
                  </Button>
                </Link>
              </>
            )}
          {user ? (
            <>
              <Link to="/">
                <Button buttonType={"menu"} onClick={logout}>
                  Log out
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button buttonType={"menu"}>Log In</Button>
              </Link>
              <Link to="/signup">
                <Button buttonType={"menu"}>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
