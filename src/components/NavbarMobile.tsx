import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="md:hidden p-4 bg-background shadow flex justify-between items-center dark:text-white text-black">
      <h1 className="text-xl font-bold">MyApp</h1>
      <button onClick={() => setOpen(!open)}>
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="absolute top-14 left-0 w-full bg-background shadow-md p-4">
          <ul className="flex flex-col gap-4">
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
          </ul>
        </div>
      )}
    </nav>
  );
}
