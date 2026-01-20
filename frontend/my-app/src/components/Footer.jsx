import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";


export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      await emailjs.send(
        "service_nl346zf",      
        "template_gb2gonn",    
        { email },
        "CVB_Mp8TzYPxVhyMO"   
      );

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Subscription failed. Please try again.");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
       
      
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">

       
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">Agrove</h2>
          <p className="text-slate-400 leading-relaxed">
            Empowering farmers with digital tools for smarter planning,
            better compliance, and sustainable productivity.
          </p>
        </div>
        
<div className="flex items-center gap-4 mt-6">
  <a
    className="
      w-11 h-11
      flex items-center justify-center
      bg-slate-800 rounded-full
      text-white
      hover:bg-green-600 hover:scale-110
      transition
    "
  >
    <FaLinkedinIn className="w-5 h-5" />
  </a>

  <a
    className="
      w-11 h-11
      flex items-center justify-center
      bg-slate-800 rounded-full
      text-white
      hover:bg-green-600 hover:scale-110
      transition
    "
  >
    <FaTwitter className="w-5 h-5" />
  </a>

  <a
    className="
      w-11 h-11
      flex items-center justify-center
      bg-slate-800 rounded-full
      text-white
      hover:bg-green-600 hover:scale-110
      transition
    "
  >
    <FaInstagram className="w-5 h-5" />
  </a>
</div>


        
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li className="hover:text-green-400 cursor-pointer">About Us</li>
            <li className="hover:text-green-400 cursor-pointer">Support</li>
            <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-green-400 cursor-pointer">Terms of Service</li>
          </ul>
        </div>

       
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-3">
            <li className="hover:text-green-400">Field Registration</li>
            <li className="hover:text-green-400">Activity Logs</li>
            <li className="hover:text-green-400">Advisory Hub</li>
            <li className="hover:text-green-400">Analytics Dashboard</li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-white font-semibold mb-4">
            Stay Updated 🌱
          </h4>
          <p className="text-slate-400 mb-5">
            Get practical farming insights and product updates directly
            in your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold text-white transition"
            >
              {status === "loading" ? "Joining…" : "Join"}
            </button>
          </form>

          {status === "success" && (
  <p className="mt-4 inline-flex items-center gap-2 text-green-400 text-sm">
    ✅ You’re subscribed
  </p>
)}

{status === "error" && (
  <p className="mt-4 inline-flex items-center gap-2 text-red-400 text-sm">
    ⚠ {error}
  </p>
)}

        </div>
      </div>

      <div className="border-t border-slate-800 py-10">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm text-slate-400">

    <div>
      <h5 className="text-white font-semibold mb-2">Built for farmers</h5>
      <p>
        Designed with real farm workflows in mind — simple, practical,
        and inspection-ready.
      </p>
    </div>

    <div>
      <h5 className="text-white font-semibold mb-2">Compliance focused</h5>
      <p>
        Supports organic, conventional, and mixed operations with
        traceability and transparency.
      </p>
    </div>

    <div>
      <h5 className="text-white font-semibold mb-2">Data you control</h5>
      <p>
        Your farm data stays private, secure, and accessible only to you.
      </p>
    </div>

  </div>
</div>


      
      <div className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        © 2026 Agrove Digital. All rights reserved.
      </div>
    </footer>
  );
}
