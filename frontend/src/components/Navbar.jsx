import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-[#121212] border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <h1 className="text-lg font-bold">TalkSpace</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <span className="text-sm mr-2"> {authUser.username}</span>
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
