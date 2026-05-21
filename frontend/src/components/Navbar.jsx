import { UserButton } from "@clerk/react";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router";
import { useLocation } from "react-router";

const Navbar  = function(){

    const {pathname} = useLocation();

    const isActive = function(currentPath){
        if(currentPath === pathname)return true;
        return false;
    }


    return (
      <div className="shadow-lg bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
        <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-lg bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl font-black bg-linear-to-br from bg-primary via-secondary to-accent bg-clip-text text-transparent tracking-wider">
                DevScreen
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">
                Code Together
              </span>
            </div>
          </Link>
          <div className="flex items-center justify-center px-2 gap-2">
            <Link to={"/problems"}>
              <button
                className={`${isActive("/problems") ? "bg-primary text-primary-content" : "bg-transparent"} px-5 py-3 rounded-lg flex items-center gap-2 cursor-pointer text-sm font-semibold hover:shadow-lg hover:scale-105 hover:bg-secondary transition-transform duration-200`}
              >
                <BookOpenIcon className="size-4" />
                <span className="hidden sm:inline">Problems</span>
              </button>
            </Link>
            <Link to={"/dashboard"}>
              <button
                className={`${isActive("/dashboard") ? "bg-primary" : "bg-transparent"} px-5 py-3 rounded-lg flex items-center gap-2 cursor-pointer text-sm font-semibold hover:shadow-lg hover:scale-105 hover:bg-secondary transition-transform duration-200`}
              >
                <LayoutDashboardIcon className="size-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
    );
}

export default Navbar
