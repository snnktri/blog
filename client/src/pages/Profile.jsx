import React from 'react';
import { NavLink, Outlet } from 'react-router';

const Profile = () => {
  return (
    <div className="grid grid-rows-[60px_1fr] lg:grid-cols-[200px_1fr] h-screen">
      {/* Header */}
      <header className="col-span-full bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          <NavLink className="" to="/profile">Profile</NavLink>
        </h1>

        {/* Mobile Dropdown Menu */}
        <div className="lg:hidden">
          <details className="relative">
            <summary className="cursor-pointer">☰</summary>
            <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded z-10 space-y-4">
              <li>
                <NavLink to="/profile/textEditor" className="block px-4 py-2 hover:bg-gray-100">
                  Text Editor
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile/settings" className="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </NavLink>
              </li>
            </ul>
          </details>
        </div>
      </header>

      {/* Sidebar - Hidden on small screens */}
      <aside className="hidden lg:block bg-gray-200 p-4">
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink to="/profile/textEditor" className="text-blue-500">Text Editor</NavLink>
            </li>
            <li>
              <NavLink to="/profile/settings" className="text-blue-500">Settings</NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="bg-white p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Profile;
