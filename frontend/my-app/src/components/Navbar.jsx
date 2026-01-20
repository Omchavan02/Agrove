// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";




// export default function Navbar() {
//    const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (

//     <nav className="bg-white shadow-md border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold text-green-600">
//           Agrove
//         </Link>
//         <ul className="flex gap-8 items-center">
//           <li>
//             <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition">
//               HOME
//             </Link>
//           </li>
//           <li>
//             <Link to="/activities" className="text-gray-700 hover:text-green-600 font-medium transition">
//               ACTIVITY & TASK LOGS
//             </Link>
//           </li>
//           {/* <li>
//             <Link to="/export" className="text-gray-700 hover:text-green-600 font-medium transition">
//               DATA EXPORT
//             </Link>
//           </li> */}
//           <li>
//             <Link to="/dashboard" className="text-gray-700 hover:text-green-600 font-medium transition">
//               ANALYTICS DASHBOARD
//             </Link>
//           </li>
//           <li>
//             <Link to="/advisory" className="text-gray-700 hover:text-green-600 font-medium transition">
//               ADVISORY HUB
//             </Link>
//           </li>
//           <li>
//             <Link to="/profile" className="text-gray-700 hover:text-green-600 font-medium transition">
//               FARMER PROFILE
//             </Link>
//           </li>
//           <li>
//   {token ? (
//     <button
//       onClick={handleLogout}
//       className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700 transition"
//     >
//       LOGOUT
//     </button>
//   ) : (
//     <Link
//       to="/login"
//       className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 transition"
//     >
//       LOGIN
//     </Link>
//   )}
// </li>

//         </ul>
//       </div>
//     </nav>
//   );
// }



import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-600">
          Agrove
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 items-center">
          <li><Link to="/" className="hover:text-green-600 transition">HOME</Link></li>
          <li><Link to="/activities" className="hover:text-green-600 transition">ACTIVITY & TASK LOGS</Link></li>
          <li><Link to="/dashboard" className="hover:text-green-600 transition">ANALYTICS DASHBOARD</Link></li>
          <li><Link to="/advisory-hub" className="hover:text-green-600 transition" onClick={() => sessionStorage.removeItem("advisoryScrollPosition")}>ADVISORY HUB</Link></li>
          <li><Link to="/profile" className="hover:text-green-600 transition">FARMER PROFILE</Link></li>

          <li>
            {token ? (
              <button
                onClick={logout}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                LOGIN
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile/Tablet Menu Button */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg py-4 px-6 flex flex-col gap-4">
          <Link to="/" className="hover:text-green-600 transition" onClick={toggleMenu}>HOME</Link>
          <Link to="/activities" className="hover:text-green-600 transition" onClick={toggleMenu}>ACTIVITY & TASK LOGS</Link>
          <Link to="/dashboard" className="hover:text-green-600 transition" onClick={toggleMenu}>ANALYTICS DASHBOARD</Link>
          <Link to="/advisory-hub" className="hover:text-green-600 transition" onClick={() => { sessionStorage.removeItem("advisoryScrollPosition"); toggleMenu(); }}>ADVISORY HUB</Link>
          <Link to="/profile" className="hover:text-green-600 transition" onClick={toggleMenu}>FARMER PROFILE</Link>

          {token ? (
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition w-full text-center"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition w-full text-center"
              onClick={toggleMenu}
            >
              LOGIN
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
