import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="md:hidden p-4 bg-background shadow flex justify-between items-center dark:text-white text-black">
      <Logo height={12} />
      <button onClick={() => setOpen(!open)}>
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-background shadow-md p-4">
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
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
