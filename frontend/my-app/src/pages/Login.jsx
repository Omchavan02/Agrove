




import { useState } from "react";
import agroveLogo from "../assets/agrove-logo.png";
import farmIllustration from "../assets/login-farm-illustration.png";
import googleIcon from "../assets/google-icon.svg";
import eyeOpen from "../assets/eye-open.svg";
import eyeClose from "../assets/eye-close.svg";


import { useAuth } from "../context/AuthContext";
import { API_BASE } from '../config';








export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("farmer"); // "farmer" or "admin"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");




  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none";


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const endpoint = role === "admin"
        ? `${API_BASE}/api/admin/login`
        : `${API_BASE}/api/auth/login`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      if (role === "admin") {
        localStorage.setItem("adminToken", data.token);
        // window.location.href = "/admin-dashboard"; // Or navigate
        // Using login from context might not work for admin if context expects user object structure different from admin
        // For now, let's assume we just navigate for admin, or use login() if it supports it.
        // Agrove(new1) just did localStorage and navigate.
        // We'll trust the User's AuthContext might be for Farmers. 
        // Let's do manual navigation for Admin to be safe, or check if login() handles generic tokens.
        // User's login() sets user state. Admin might not have 'user' object same way.
        // Agrove(new1) response: { token }. 
        // Agrove1 response: { token, user }.
        // So for Admin, we just save token and redirect.
        localStorage.setItem("adminToken", data.token);
        window.location.href = "/admin-dashboard";
      } else {
        login(data.token, data.user);
      }

    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          mobile,
          location,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Account created successfully");
      setIsRegister(false);
    } catch (err) {
      alert("Registration failed");
    }
  };

  const handleGoogleLogin = () => {
  window.location.href = `${API_BASE}/api/auth/google`;
};




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">



        <div
          className={`p-10 md:p-14 flex flex-col justify-center transition-all duration-700 ${isRegister ? "md:col-start-2" : "md:col-start-1"
            }`}
        >
          <img src={agroveLogo} alt="Agrove" className="w-36 mb-6" />

          <h2 className="text-3xl font-extrabold text-slate-900">
            {isRegister
              ? "Create your Agrove account"
              : role === "admin" ? "Admin Login" : "Welcome back to Agrove"}
          </h2>

          <p className="text-slate-600 mt-2 mb-8">
            {isRegister
              ? "Join Agrove and start managing your farm digitally."
              : role === "admin" ? "Manage the platform securely." : "Login to continue your smart farming journey."}
          </p>

          {/* Role Toggle */}
          {!isRegister && (
            <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
              <button
                type="button"
                onClick={() => setRole("farmer")}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${role === "farmer"
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Farmer
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${role === "admin"
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Admin
              </button>
            </div>
          )}

          {/* ================= SINGLE FORM ================= */}
          <form
            className="space-y-5"
            onSubmit={isRegister ? handleRegister : handleLogin}
          >

            {isRegister && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className={inputClass}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Location (Village / City)"
                  className={inputClass}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

              </div>
            )}

            <input
              type="email"
              placeholder="Email address"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <img
                src={showPassword ? eyeClose : eyeOpen}
                alt="Toggle password"
                onClick={() => setShowPassword(!showPassword)}
                className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
              />
            </div>

            {isRegister && (
              <input
                type="password"
                placeholder="Confirm Password"
                className={inputClass}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

            )}

            {!isRegister && (
              <p className="text-sm text-right text-green-600 cursor-pointer hover:underline">
                Forgot password?
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >

              {isRegister ? "Create Account" : "Login"}
            </button>
          </form>


          {!isRegister && (
            <>
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="px-4 text-sm text-slate-500">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="flex justify-center">
                <button
  type="button"
  onClick={handleGoogleLogin}
  className="flex items-center gap-3 border px-6 py-3 rounded-xl hover:bg-slate-100 transition"
>
  <img src={googleIcon} alt="Google" className="w-5 h-5" />
  <span>Continue with Google</span>
</button>



                {/* // fetch("http://localhost:5000/api/auth/google", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({
          //     email: decoded.email,
          //     name: decoded.name,
          //     picture: decoded.picture,
          //   }),
          // })
          //   .then((res) => res.json())
          //   .then((data) => {
          //     login(data.token, data.user);
          //   }); */}

                

              </div>
            </>
          )}
        </div>



        <div
          className={`
    absolute top-0 right-0 h-full w-1/2 hidden md:flex
    items-center justify-center text-white
    transition-transform duration-700 ease-in-out
    ${isRegister ? "-translate-x-full" : "translate-x-0"}
  `}
          style={{
            backgroundImage: `url(${farmIllustration})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative text-center px-10 max-w-sm">
            <h2 className="text-4xl font-extrabold mb-4 text-emerald-100">
              {isRegister ? "Already part of Agrove?" : "New here? Join Agrove 🌱"}
            </h2>

            <p className="text-white/90 mb-8 text-lg">
              {isRegister
                ? "Login and continue your smart farming journey."
                : "Create your free account and start managing your farm smarter."}
            </p>

            <button
              onClick={() => setIsRegister(!isRegister)}
              className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 hover:scale-105"
            >
              {isRegister ? "Sign In" : "Create Account"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}



