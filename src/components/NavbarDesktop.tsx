import { Link } from "react-router";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export default function NavbarDesktop() {
  const { isAuthenticated, signOut, user } = useAuth();
  const displayName =
    user?.user_metadata.full_name ||
    user?.user_metadata.username ||
    "Anonymous";

  async function handleSignOut() {
    await signOut();
  }

  return (
    <nav className="hidden md:block z-50 fixed top-0 left-0 right-0 py-4 bg-background dark:bg-gray-900  dark:text-white text-black shadow-sm border-b border-gray-200/20 dark:border-gray-800/20">
      <div className="my-container items-center justify-between flex w-full">
        <Logo height={12} />

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/home"
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/30"
              >
                Home
              </Link>

              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
                    {user?.user_metadata.avatarUrl ? (
                      <Avatar>
                        <AvatarImage
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-400 dark:hover:ring-blue-500 transition-all duration-200 cursor-pointer"
                          src={user?.user_metadata.avatarUrl}
                          alt={displayName}
                        />
                        <AvatarFallback className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-400 dark:hover:ring-blue-500 transition-all duration-200 cursor-pointer">
                          <span className="text-sm font-semibold text-white">
                            {displayName.charAt(0).toUpperCase()}
                          </span>
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-400 dark:hover:ring-blue-500 transition-all duration-200 cursor-pointer">
                        <span className="text-sm font-semibold text-white">
                          {displayName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link
                      to={`/profile/${user?.id}`}
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer w-full"
                    >
                      <User className="h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-700" />

                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer w-full text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <ModeToggle />

              <div className="flex items-center gap-3">
                <Link
                  to="/signin"
                  className="text-sm font-medium  transition-colors duration-200 px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/30"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
