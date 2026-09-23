import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Key, Menu, X } from "lucide-react";
import type React from "react";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { to: "/", label: "Library" },
  { to: "/browse", label: "Browse" },
  { to: "/setlist", label: "Setlist" },
];
function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <header className="bg-black text-white">
        <div className="max-w-6xl mx-auto flex px-6 py-4 items-center justify-between">
          <div className="font-display text-2xl">wax.</div>
          <nav className="hidden md:flex items-center gap-1 relative">
            {navItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className="relative px-4 py-2"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${isActive ? "text-black" : "text-neutral-400"}`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-neutral-800"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 px-6 text-sm ${isActive ? "text-white" : "text-neutral-400"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              ;
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default Layout;
