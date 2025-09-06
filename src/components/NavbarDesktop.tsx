import { Link } from "react-router";
import Logo from "./Logo";

export default function NavbarDesktop() {
  return (
    <nav className="hidden md:flex my-container items-center justify-between p-4 bg-background dark:text-white text-black shadow">
      <Logo height={12} />
      <ul className="flex gap-6">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
