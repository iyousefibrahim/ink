import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, signOut, user } = useAuth();
  const displayName =
    user?.user_metadata.full_name ||
    user?.user_metadata.username ||
    "Anonymous";

  async function handleSignOut() {
    await signOut();
    setOpen(false);
  }

  return (
    <nav className="md:hidden p-4 bg-background fixed z-50 top-0 left-0 right-0 shadow-sm border-b border-gray-200/20 dark:border-gray-800/20 flex justify-between items-center dark:text-white text-black">
      <Logo height={12} />
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
      >
        {open ? (
          <X className="h-6 w-6 cursor-pointer" />
        ) : (
          <Menu className="h-6 w-6 cursor-pointer" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute top-[73px] left-0 w-full bg-background shadow-lg border-t border-gray-200/20 dark:border-gray-800/20 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6">
          {isAuthenticated ? (
            <>
              {/* User Profile Section */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
                {user?.user_metadata.avatarUrl ? (
                  <Avatar>
                    <AvatarImage
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                      src={user?.user_metadata.avatarUrl}
                      alt={displayName}
                    />
                    <AvatarFallback className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-700">
                      <span className="text-base font-semibold text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-700">
                    <span className="text-base font-semibold text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    to="/home"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/profile/${user?.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                </li>

                <li className="px-3 py-2">
                  <ModeToggle />
                </li>

                <li className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-200 w-full text-left text-red-600 dark:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Non-authenticated menu */}
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    to="/signin"
                    onClick={() => setOpen(false)}
                    className="flex items-center px-3 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                </li>

                <li>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="flex items-center px-3 py-3 text-sm font-medium bg-primary text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </li>

                <li className="px-3 py-2 mt-2">
                  <ModeToggle />
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
