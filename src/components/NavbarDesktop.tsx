import { Link } from "react-router";

export default function NavbarDesktop() {
  return (
    <nav className="hidden md:flex my-container items-center justify-between p-4 bg-background dark:text-white text-black shadow">
      <h1 className="text-xl font-bold">MyApp</h1>
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
