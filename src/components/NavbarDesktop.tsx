import { Link } from "react-router";
import Logo from "./Logo";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { ModeToggle } from "./ModeToggle";

export default function NavbarDesktop() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
    }
  }, [theme, setTheme]);

  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0  py-4 bg-background dark:text-white text-black shadow">
      <div className="my-container items-center justify-between flex w-full">
        <Logo height={12} />
        <ul className="flex gap-6 items-center">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
