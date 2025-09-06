import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/contexts/AuthContext";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    setOpen(false);
  }

  return (
    <nav className="md:hidden p-4 bg-background fixed z-50 top-0 left-0 right-0 shadow flex justify-between items-center dark:text-white text-black">
      <Logo height={12} />
      <button onClick={() => setOpen(!open)}>
        <Menu className="h-6 w-6 cursor-pointer" />
      </button>

      <div
        className={`absolute top-16 left-0 w-full bg-background shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/home" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  Profile
                </Link>
              </li>
              <li>
                <ModeToggle />
              </li>
              <li>
                <Link to="/signin" replace onClick={handleSignOut}>
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin" onClick={() => setOpen(false)}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </li>
              <li>
                <ModeToggle />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
