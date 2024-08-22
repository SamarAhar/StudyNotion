import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleSidebarClick = () => {
    setIsSidebarOpen(false);
  };

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-14 left-0 z-40 h-full bg-gray-900 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:top-0 md:translate-x-0 md:w-64 md:relative md:bg-gray-900`}
        style={{ width: '250px' }} // Adjust mobile width if needed
      >
        <Sidebar onClick={handleSidebarClick} />
      </div>

      {/* Main content */}
      <div
        className={`flex-1 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-50" : "opacity-100"
        } md:opacity-100`}
      >
        {/* Button to toggle the sidebar visibility on mobile screens */}
        {!isSidebarOpen && (
          <button
            className="pt-2 pb-0 bg-gray-800 text-white rounded-md mt-2 mx-4 md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            Menu
          </button>
        )}

        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
