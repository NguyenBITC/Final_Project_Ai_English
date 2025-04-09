import React, { useEffect, useState, createContext, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo/14.png"; // Replace with your logo path

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.user) {
      setUser(userInfo.user);
    }
  }, [setUser]);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Xóa thông tin người dùng trong localStorage
    setUser(null); // Xóa thông tin người dùng trong state
    navigate("/login"); // Điều hướng đến trang đăng nhập
    setMenuOpen(false); // Đóng menu khi đăng xuất
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Learning Path", path: "/learning-path" },
    { name: "Placement Test", path: "/placement-test" },
    { name: "Grammar Practice", path: "/grammar-practice" },
    { name: "Progress Report", path: "/progress-report" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-90 text-white shadow-md transition-all ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <Link to="/home">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </Link>

          <div className="hidden md:flex space-x-6">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`hover:text-yellow-400 font-semibold transition ${
                  location.pathname === item.path ? "text-yellow-400" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="text-yellow-300 font-bold focus:outline-none">
                  Hello, {user.name}!
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg overflow-hidden">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/profile" className={`block px-4 py-2 font-semibold ${active ? "bg-gray-300" : ""}`}>
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout} // Gọi hàm handleLogout khi người dùng đăng xuất
                        className={`block w-full text-left px-4 py-2 font-semibold ${active ? "bg-gray-300" : ""}`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <>
                <Link to="/login" className="hover:text-yellow-400 font-semibold transition">Login</Link>
                <Link to="/signup" className="hover:text-yellow-400 font-semibold transition">Sign Up</Link>
              </>
            )}
          </div>

          {/* Responsive Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none">
            {menuOpen ? <XMarkIcon className="h-8 w-8 text-white" /> : <Bars3Icon className="h-8 w-8 text-white" />}
          </button>
        </div>

        {/* Responsive menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900 bg-opacity-90 text-white py-4 space-y-4">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`block px-6 py-2 font-semibold ${
                  location.pathname === item.path ? "text-yellow-400" : "hover:text-yellow-400"
                }`}
                onClick={() => setMenuOpen(false)} // Đóng menu khi người dùng chọn một liên kết
              >
                {item.name}
              </Link>
            ))}
            <div className="px-6">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-left text-yellow-300 font-bold"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="block py-2 text-yellow-300">Login</Link>
                  <Link to="/signup" className="block py-2 text-yellow-300">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main style={{ paddingTop: `${navHeight}px` }}>
        {/* Nội dung trang sẽ được hiển thị ở đây */}
      </main>
    </>
  );
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default Navbar;
