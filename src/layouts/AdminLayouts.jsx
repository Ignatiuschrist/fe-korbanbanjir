import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-row flex-1">
        <aside className="bg-indigo-900 w-64 text-white">
          <div className="p-3 mb-6 text-left">
            <h2 className="font-bold">WebsiteKu</h2>
            <nav className="mt-3 ml-2">
              <ul>
                <li>
                 <Link to="/admin/dashboard" className="block p-2">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/KorbanBanjir" className="block p-2">KorbanBanjir</Link>
                </li>
                <li>
                  <a href="#">Setting</a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

const Header = () => {};

const Footer = () => {
  return (
    <footer className="bg-indigo-900 py-2 text-center text-white">
      &copy; WebsiteKu 2024
    </footer>
  );
};

export default AdminLayout;
