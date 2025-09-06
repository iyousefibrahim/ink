import { Link } from "react-router";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/contexts/AuthContext";

export default function NavbarDesktop() {
  const { isAuthenticated, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <nav className="hidden md:block z-50 fixed top-0 left-0 right-0  py-4 bg-background dark:text-white text-black shadow">
      <div className="my-container items-center justify-between flex w-full">
        <Logo height={12} />
        <ul className="flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
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
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <ModeToggle />
              </li>
            </>
          )}
          <li></li>
        </ul>
      </div>
    </nav>
  );
}
