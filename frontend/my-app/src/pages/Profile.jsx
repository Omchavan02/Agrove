import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { API_BASE } from '../config';
// import farmBg from "../assets/farm-bg.jpg";


function Dashboard({ farmer, setActive }) {
  // safety check
  if (!farmer) return null;

  const navigate = useNavigate();
  const documents = JSON.parse(localStorage.getItem("farmerDocuments"));

  /* ================= PROFILE COMPLETION ================= */
  // ================= PROFILE COMPLETION (DYNAMIC) =================

  const profileFields = [
    farmer.name,
    farmer.age,
    farmer.gender,
    farmer.phone,
    farmer.village,
    farmer.taluka,
    farmer.district,
    farmer.state,
    farmer.pincode,

    farmer.cropName,
    farmer.soilType,
    farmer.irrigationType,
    farmer.landArea,
    farmer.farmerType,

    farmer.bankName,
    farmer.accountNumber,
    farmer.ifsc,
    farmer.pmKisan,
  ];

  const filledFields = profileFields.filter(
    (field) => field && field.toString().trim() !== ""
  ).length;

  const profileCompletion = Math.round(
    (filledFields / profileFields.length) * 100
  );
  let documentCompletion = 0;

  if (documents) {
    const docFilled = Object.values(documents).filter(Boolean).length;
    documentCompletion = Math.round((docFilled / 6) * 100);
  }

  const completion = Math.round(
    profileCompletion * 0.7 + documentCompletion * 0.3
  );

  const completionStatus =
    completion === 100
      ? "Completed"
      : completion >= 75
        ? "Almost Done"
        : completion >= 40
          ? "In Progress"
          : "Incomplete";
  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}

      {/* ================= HEADER ================= */}


      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
        <h2 className="text-3xl font-bold text-green-800">
          Welcome, {farmer.name} 🌾
        </h2>
        <p className="text-gray-600 mt-1">
          Quick overview of your farming profile
        </p>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard title="Profile Completion" value={`${completion}%`} />
        <SummaryCard
          title="Documents"
          value={documents ? "Uploaded" : "Pending"}
        />
        <SummaryCard title="Weather" value="Sunny ☀ 28°C" />
        <SummaryCard title="Active Scheme" value="PM-KISAN" />
      </div>

      {/* ================= STATUS ================= */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          📊 Profile Status
        </h3>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-green-600 h-4 rounded-full transition-all"
            style={{ width: `${completion}%` }}
          ></div>
        </div>

        <p className="text-gray-700">
          Status:{" "}
          <span className="font-semibold text-green-700">
            {completionStatus}
          </span>
        </p>
      </div>

      {/* ================= ALERTS ================= */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          🔔 Alerts & Notifications
        </h3>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Rain expected in your area in next 3 days</li>
          <li>Crop insurance registration window is open</li>
          <li>New government subsidy available</li>
        </ul>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-green-700 mb-6">
          ⚡ Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ActionButton
            label="Complete Profile"
            color="green"
            onClick={() => setActive("DocumentsUpload")}
          />

          <ActionButton
            label="Upload Documents"
            color="blue"
            onClick={() => setActive("DocumentsUpload")}
          />

          <ActionButton
            label="Government Sites"
            color="gray"
            onClick={() => setActive("Sites")}
          />
        </div>
      </div>

    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-600">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-bold text-gray-800 mt-1">
        {value}
      </h3>
    </div>
  );
}

function ActionButton({ label, onClick, color }) {
  const colors = {
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    gray: "bg-gray-700 hover:bg-gray-800",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white py-3 rounded-xl font-semibold shadow`}
    >
      {label}
    </button>
  );
}

// function Documents({ active }) {
//   const [documents, setDocuments] = useState(null);

//   useEffect(() => {
//   if (active !== "Documents") return;

//   const fetchDocuments = async () => {
//     const token = localStorage.getItem("token");

//     const res = await fetch("http://localhost:5001/api/profile", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     console.log("DOCUMENTS FROM API:", data.documents);
//     setDocuments(data.documents || {});
//   };

//   fetchDocuments();
// }, [active]);


//   const documentList = [
//     { key: "aadhaarNumber", label: "Aadhaar Number", type: "text" },
//     { key: "rationCard", label: "Ration Card", type: "file" },
//     { key: "propertyCard", label: "Property Card", type: "file" },
//     { key: "property712No", label: "7/12 Property Number", type: "text" },
//     { key: "property712File", label: "7/12 Document", type: "file" },
//   ];

//   return (
//     <div className="space-y-10">
//       <h2 className="text-2xl font-bold text-green-800">
//         Uploaded Documents 📄
//       </h2>

//       {!documents ? (
//         <div className="bg-white p-6 rounded-xl shadow text-gray-500">
//           No documents uploaded yet.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {documentList.map((doc) => {
//             const value = documents[doc.key];
//             if (!value) return null;

//             return (
//               <div
//                 key={doc.key}
//                 className="bg-white p-5 rounded-xl shadow border-l-4 border-green-600"
//               >
//                 <p className="text-sm text-gray-500">{doc.label}</p>

//                 {doc.type === "text" ? (
//                   <p className="text-lg font-semibold text-gray-800 mt-1">
//                     {value}
//                   </p>
//                 ) : (
//                   <p className="mt-2 text-green-600 font-medium">
//                     ✔ Uploaded
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

function Prop({ farmer }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-10">

      {/* ================= TITLE ================= */}
      <h2 className="text-2xl font-bold text-green-800">
        Farmer Profile Overview 🌾
      </h2>

      {/* ================= PERSONAL DETAILS ================= */}
      <section>
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          👤 Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Info label="Name" value={farmer.name} />
          <Info label="Age" value={farmer.age} />
          <Info label="Gender" value={farmer.gender} />
          <Info label="Phone Number" value={farmer.phone || "Not Added"} />
          <Info label="Village" value={farmer.village} />
          <Info label="Taluka" value={farmer.taluka} />
          <Info label="District" value={farmer.district} />
          <Info label="State" value={farmer.state} />
          <Info label="Pincode" value={farmer.pincode || "Not Added"} />
        </div>
      </section>

      {/* ================= FARMING DETAILS ================= */}
      <section>
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          🌱 Farming Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Info label="Crop Name" value={farmer.cropName || "Not Added"} />
          <Info label="Soil Type" value={farmer.soilType || "Not Added"} />
          <Info label="Irrigation Type" value={farmer.irrigationType || "Not Added"} />
          <Info label="Land Area (Acres)" value={farmer.landArea || "Not Added"} />
          <Info
            label="Farmer Type"
            value={farmer.farmerType || "Not Added"}
          />
        </div>
      </section>

      {/* ================= BANK & SCHEME DETAILS ================= */}
      <section>
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          🏦 Bank & Scheme Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Info label="Bank Name" value={farmer.bankName || "Not Added"} />
          <Info
            label="Account Number"
            value={farmer.accountNumber || "Not Added"}
          />
          <Info label="IFSC Code" value={farmer.ifsc || "Not Added"} />
          <Info
            label="PM-Kisan Registered"
            value={farmer.pmKisan === "yes" ? "Yes ✅" : "No ❌"}
          />
        </div>
      </section>

    </div>
  );
}

/* ================= SMALL REUSABLE CARD ================= */
function Info({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-600">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function Prop1({ setFarmer }) {
  const saved = JSON.parse(localStorage.getItem("loggedInFarmer")) || {};

  const [form, setForm] = useState({
    name: saved.name || "",
    age: saved.age || "",
    gender: saved.gender || "",
    phone: saved.phone || "",
    village: saved.village || "",
    taluka: saved.taluka || "",
    district: saved.district || "",
    state: saved.state || "",
    pincode: saved.pincode || "",

    cropName: saved.cropName || "",
    soilType: saved.soilType || "",
    irrigationType: saved.irrigationType || "",
    landArea: saved.landArea || "",
    farmerType: saved.farmerType || "",

    bankName: saved.bankName || "",
    accountNumber: saved.accountNumber || "",
    ifsc: saved.ifsc || "",
    pmKisan: saved.pmKisan || "no",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      // 🔥 YAHI LINE IMPORTANT HAI
      setFarmer((prev) => ({ ...prev, ...form }));

      alert("Profile saved & UI updated ✅");
    } catch (err) {
      alert("Profile save failed ❌");
    }
  };


  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
        <h2 className="text-3xl font-bold text-green-800">
          👤 Farmer Profile
        </h2>
        <p className="text-gray-600 mt-1">
          Complete your personal, farming and bank details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ================= PERSONAL INFO ================= */}
        <Section title="👤 Personal Information">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Age" name="age" value={form.age} onChange={handleChange} />
          <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}
            options={["Male", "Female", "Other"]} />
          <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Village" name="village" value={form.village} onChange={handleChange} />
          <Input label="Taluka" name="taluka" value={form.taluka} onChange={handleChange} />
          <Input label="District" name="district" value={form.district} onChange={handleChange} />
          <Input label="State" name="state" value={form.state} onChange={handleChange} />
          <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />
        </Section>

        {/* ================= FARM DETAILS ================= */}
        <Section title="🌱 Farming Details">
          <Input label="Crop Name" name="cropName" value={form.cropName} onChange={handleChange} />
          <Input label="Soil Type" name="soilType" value={form.soilType} onChange={handleChange} />
          <Input label="Irrigation Type" name="irrigationType" value={form.irrigationType} onChange={handleChange} />
          <Input label="Land Area (Acres)" name="landArea" value={form.landArea} onChange={handleChange} />
          <Select label="Farmer Type" name="farmerType" value={form.farmerType} onChange={handleChange}
            options={["Small", "Marginal", "Large"]} />
        </Section>

        {/* ================= BANK DETAILS ================= */}
        <Section title="🏦 Bank & Scheme Details">
          <Input label="Bank Name" name="bankName" value={form.bankName} onChange={handleChange} />
          <Input label="Account Number" name="accountNumber" value={form.accountNumber} onChange={handleChange} />
          <Input label="IFSC Code" name="ifsc" value={form.ifsc} onChange={handleChange} />
          <Select label="PM-KISAN Registered" name="pmKisan" value={form.pmKisan} onChange={handleChange}
            options={["yes", "no"]} />
        </Section>

        {/* ================= SAVE BUTTON ================= */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl font-semibold shadow-lg"
          >
            Save Profile
          </button>
        </div>

      </form>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-semibold text-green-700 mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
      >
        <option value="">Select</option>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
function Sites() {
  const sites = [
    {
      name: "PM-KISAN Samman Nidhi",
      link: "https://pmkisan.gov.in",
      use: "Direct ₹6000 yearly financial assistance to farmers.",
      type: "Central Government",
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      link: "https://pmfby.gov.in",
      use: "Crop insurance against natural calamities and losses.",
      type: "Central Government",
    },
    {
      name: "Kisan Suvidha Portal",
      link: "https://kisansuvidha.gov.in",
      use: "Weather updates, market prices, agro advisories.",
      type: "Central Government",
    },
    {
      name: "mKisan Portal",
      link: "https://mkisan.gov.in",
      use: "Government SMS, advisories, and farmer registration.",
      type: "Central Government",
    },
    {
      name: "Ministry of Agriculture & Farmers Welfare",
      link: "https://www.agriwelfare.gov.in",
      use: "All central agriculture schemes and policies.",
      type: "Central Government",
    },
    {
      name: "Krushi Vibhag – Maharashtra",
      link: "https://krishi.maharashtra.gov.in",
      use: "State agriculture schemes, crop guidance & notices.",
      type: "Maharashtra Government",
    },
    {
      name: "MahaDBT Farmer Portal",
      link: "https://mahadbt.maharashtra.gov.in",
      use: "Apply for Maharashtra agriculture subsidies & schemes.",
      type: "Maharashtra Government",
    },
    {
      name: "Maharashtra Farmer Registry (AgriStack)",
      link: "https://mhfr.agristack.gov.in",
      use: "Farmer digital ID & official agriculture records.",
      type: "Maharashtra Government",
    },
    {
      name: "MSAMB – Agricultural Marketing Board",
      link: "https://www.msamb.com",
      use: "Market prices, mandis, and agri marketing support.",
      type: "Maharashtra Government",
    },
    {
      name: "Maharashtra Food & Civil Supplies",
      link: "https://mahafood.gov.in",
      use: "Ration card, food subsidy & farmer food schemes.",
      type: "Maharashtra Government",
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-green-800">
          🌐 Government Farmer Portals
        </h2>
        <p className="text-gray-600 mt-1">
          Official Central & Maharashtra Government websites for farmers
        </p>
      </div>

      {/* SITES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sites.map((site, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow border-l-4 border-green-600 hover:shadow-lg transition"
          >
            <p className="text-xs text-gray-500 mb-1">{site.type}</p>

            <h3 className="text-lg font-semibold text-green-800">
              {site.name}
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              {site.use}
            </p>

            <a
              href={site.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-green-700 font-medium underline"
            >
              Visit Website →
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}


function Settings() {
  // screens
  const [step, setStep] = useState("settings");
  // settings | change | forgot | otp | reset

  // appearance
  const [theme, setTheme] = useState("light");

  // language
  const [language, setLanguage] = useState("English");

  // notifications
  const [notifications, setNotifications] = useState({
    schemes: true,
    weather: true,
    crops: false,
    payments: true,
  });

  // support
  const [supportMsg, setSupportMsg] = useState("");

  // password + otp
  const [form, setForm] = useState({
    farmerId: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: "",
    otp: "",
    captcha: "",
  });

  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleNotification = (key) =>
    setNotifications({ ...notifications, [key]: !notifications[key] });

  /* ================= HELP & SUPPORT ================= */
  const submitIssue = () => {
    if (!supportMsg.trim()) {
      alert("Please describe your issue");
      return;
    }

    const existing =
      JSON.parse(localStorage.getItem("supportIssues")) || [];

    existing.push({
      message: supportMsg,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("supportIssues", JSON.stringify(existing));
    setSupportMsg("");
    alert("Issue sent successfully ✅");
  };

  /* ================= PASSWORD LOGIC ================= */

  const changePassword = (e) => {
    e.preventDefault();
    alert("Password changed successfully ✅ (Demo)");
    setStep("settings");
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    await emailjs.send(
      "YOUR_SERVICE_ID",   // 🔁 replace
      "YOUR_TEMPLATE_ID",  // 🔁 replace
      { to_email: form.email, otp },
      "YOUR_PUBLIC_KEY"    // 🔁 replace
    );

    alert("OTP sent to email 📧");
    setStep("otp");
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    if (form.otp !== generatedOtp || form.captcha !== "AG12B") {
      alert("Invalid OTP or Captcha");
      return;
    }
    setStep("reset");
  };

  const resetPassword = (e) => {
    e.preventDefault();
    alert("Password reset successful ✅ (Demo)");
    setStep("settings");
  };

  const rootTheme =
    theme === "dark"
      ? "bg-gray-900 text-white"
      : "bg-transparent text-gray-800";

  /* ================= MAIN SETTINGS PAGE ================= */

  if (step === "settings") {
    return (
      <div className={`space-y-8 transition-all ${rootTheme}`}>

        <Card title="🔐 Security" theme={theme}>
          <button
            onClick={() => setStep("change")}
            className="btn-primary"
          >
            Change Password
          </button>
        </Card>

        <Card title="🌐 Language & Region" theme={theme}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input"
          >
            <option>English</option>
            <option>हिंदी</option>
            <option>मराठी</option>
          </select>
        </Card>

        <Card title="🔔 Notifications" theme={theme}>
          {Object.keys(notifications).map((key) => (
            <label
              key={key}
              className="flex justify-between items-center"
            >
              <span className="capitalize">{key} alerts</span>
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() => toggleNotification(key)}
              />
            </label>
          ))}
        </Card>

        <Card title="🎨 Appearance" theme={theme}>
          <div className="flex gap-4">
            <button
              onClick={() => setTheme("light")}
              className={`px-4 py-2 rounded-lg ${theme === "light"
                ? "bg-green-600 text-white"
                : "bg-gray-300"
                }`}
            >
              Light
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`px-4 py-2 rounded-lg ${theme === "dark"
                ? "bg-green-600 text-white"
                : "bg-gray-300"
                }`}
            >
              Dark
            </button>
          </div>
        </Card>

        <Card title="🆘 Help & Support" theme={theme}>
          <textarea
            value={supportMsg}
            onChange={(e) => setSupportMsg(e.target.value)}
            placeholder="Describe your issue..."
            className="input h-24"
          />
          <button
            onClick={submitIssue}
            className="btn-primary mt-2"
          >
            Submit Issue
          </button>
        </Card>

      </div>
    );
  }

  /* ================= PASSWORD SCREENS ================= */

  return (
    <form
      onSubmit={
        step === "change"
          ? changePassword
          : step === "forgot"
            ? sendOtp
            : step === "otp"
              ? verifyOtp
              : resetPassword
      }
      className={`p-6 rounded-2xl shadow-xl space-y-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white/90"
        }`}
    >
      <h3 className="text-xl font-bold text-green-700">
        🔐 Password Management
      </h3>

      {step === "change" && (
        <>
          <SettingInput label="Farmer ID" name="farmerId" onChange={handleChange} />
          <SettingInput label="Old Password" type="password" name="oldPassword" onChange={handleChange} />
          <Input label="New Password" type="password" name="newPassword" onChange={handleChange} />
          <button className="btn-primary">Change Password</button>
          <p
            onClick={() => setStep("forgot")}
            className="link"
          >
            Forgot password?
          </p>
        </>
      )}

      {step === "forgot" && (
        <>
          <SettingInput label="Registered Email" name="email" onChange={handleChange} />
          <button className="btn-primary">Send OTP</button>
        </>
      )}

      {step === "otp" && (
        <>
          <SettingInput label="Enter OTP" name="otp" onChange={handleChange} />
          <Input label="Captcha (AG12B)" name="captcha" onChange={handleChange} />
          <button className="btn-primary">Verify</button>
        </>
      )}

      {step === "reset" && (
        <>
          <SettingInput label="New Password" type="password" name="newPassword" onChange={handleChange} />
          <Input label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} />
          <button className="btn-primary">Reset Password</button>
        </>
      )}

      <p
        onClick={() => setStep("settings")}
        className="link text-center"
      >
        ← Back to Settings
      </p>
    </form>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Card({ title, children, theme }) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-xl space-y-4 transition-all ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white/90"
        }`}
    >
      <h3 className="text-xl font-semibold text-green-700">
        {title}
      </h3>
      {children}
    </div>
  );
}

function SettingInput({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600 dark:text-gray-300">
        {label}
      </label>
      <input
        {...props}
        className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

function DocumentsUpload({ setActive }) {
  const [documents, setDocuments] = useState({
    aadhaarNumber: "",
    aadhaarFile: null,
    rationCard: null,
    propertyCard: null,
    property712No: "",
    property712File: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments({ ...documents, [name]: files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocuments({ ...documents, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("aadhaarNumber", documents.aadhaarNumber);
    formData.append("property712No", documents.property712No);

    formData.append("rationCard", !!documents.rationCard);
    formData.append("propertyCard", !!documents.propertyCard);
    formData.append("property712File", !!documents.property712File);

    if (documents.aadhaarFile) {
      formData.append("aadhaarFile", documents.aadhaarFile);
    }
    if (documents.property712File) {
      formData.append("property712Doc", documents.property712File);
    }

    try {
      const res = await fetch(`${API_BASE}/api/profile/documents`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("Documents saved to MongoDB ✅");

      setActive("Documents");
    } catch (err) {
      console.error(err);
      alert("Document save failed ❌");
    }
  };

  const FileBox = ({ label, name }) => {
    const isUploaded = !!documents[name];

    return (
      <div>
        <label className="text-sm font-medium mb-1 block">{label}</label>

        {isUploaded ? (
          <div className="h-12 flex items-center text-green-600 font-semibold">
            ✔ Uploaded
          </div>
        ) : (
          <label className="h-12 border border-green-400 rounded-lg bg-green-50 cursor-pointer flex items-center justify-center text-sm text-gray-600 hover:bg-green-100">
            Choose file
            <input
              type="file"
              name={name}
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-green-800 text-center">
        📄 Upload Farmer Documents
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold text-green-700 mb-4">
            Aadhaar Details
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="aadhaarNumber"
              placeholder="Aadhaar Number"
              className="input"
              onChange={handleChange}
              required
            />
            <FileBox label="Aadhaar Card" name="aadhaarFile" />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold text-green-700 mb-4">
            Other Documents
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <FileBox label="Ration Card" name="rationCard" />
            <FileBox label="Property Card" name="propertyCard" />

            <input
              type="text"
              name="property712No"
              placeholder="7/12 Property Number"
              className="input"
              onChange={handleChange}
              required
            />

            <FileBox label="7/12 Document" name="property712File" />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            Save Documents
          </button>

          <button
            type="button"
            onClick={() => setActive("Documents")}
            className="w-full bg-gray-200 py-3 rounded-xl font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= MAIN PROFILE ================= */
function Profile() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [farmer, setFarmer] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const user = await res.json();

        // 🔥 MONGO → FRONTEND STATE
        setFarmer({
          name: user.name || "",
          phone: user.mobile || "",
          village: user.location || "",

          ...user.profile,   // 👈 ALL PROFILE FIELDS
        });
      } catch (err) {
        navigate("/login");
      }
    }

    fetchProfile();
  }, [navigate]);



  if (!farmer) return null;

  const initials = farmer.name
    ? farmer.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
    : "F";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      <div className="min-h-screen bg-white/40 flex">

        {/* ========== SIDEBAR ========== */}
        <div className="w-64 bg-white shadow-xl p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              {initials}
            </div>
            <div>
              <p className="font-semibold">{farmer.name}</p>
              <p className="text-sm text-gray-500">{farmer.village}</p>
            </div>
          </div>

          {[
            "Dashboard",
            "Profile",
            "Personal Info",
            "Sites",
            "Settings"

            ,
          ].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 font-medium ${active === item
                ? "bg-green-600 text-white"
                : "hover:bg-green-100"
                }`}
            >
              {item}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full mt-6 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>

        {/* ========== CONTENT AREA ========== */}
        <div className="flex-1 p-8 overflow-y-auto">

          {active === "Dashboard" && (
            <Dashboard farmer={farmer} setActive={setActive} />
          )}

          {/* ✅ PROFILE = ENTRY FORM */}
          {active === "Profile" && <Prop1 setFarmer={setFarmer} />}

          {/* ✅ PERSONAL INFO = VIEW ONLY */}
          {active === "Personal Info" && <Prop farmer={farmer} />}

          {active === "Documents" && <Documents />}

          {active === "Sites" && <Sites />}

          {active === "Settings" && <Settings />}

          {active === "DocumentsUpload" && (
            <DocumentsUpload setActive={setActive} />
          )}

        </div>

      </div>
    </div>
  );
}

export default Profile;