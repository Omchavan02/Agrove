
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";



const ROUTES = {
  login: "/login",
  advisory: "/advisory-hub",
  about: "/about",
};


const YOUTUBE_URL = "https://www.youtube.com/watch?v=AnGdzz-XWcE";

function getYouTubeEmbedUrl(url) {
  try {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } catch {
    return "";
  }
}


import hero1 from "../assets/hero-slide-1.jpg";
import hero2 from "../assets/hero-slide-2.jpg";
import hero3 from "../assets/hero-slide-3.jpg";

import fieldIcon from "../assets/icon-field.png";
import activityIcon from "../assets/icon-activity.png";
import analyticsIcon from "../assets/icon-analytics.png";

import demoThumbnail from "../assets/demo-thumbnail.jpg";
import youtubePlay from "../assets/youtube-play.png";

import farmer1 from "../assets/farmer-1.jpg";
import farmer2 from "../assets/farmer-2.jpg";
import farmer3 from "../assets/farmer-3.jpg";

import mobileMockup from "../assets/mobile-mockup.png";

import blog1 from "../assets/blog-1-digital-farm.jpg";
import blog2 from "../assets/blog-2-crop-planning.jpg";
import blog3 from "../assets/blog-3-advisory.jpg";

import blogIcon from "../assets/blog.svg";
import aboutIcon from "../assets/about.svg";




const HERO_IMAGES = [hero1, hero2, hero3];

const FEATURES = [
  {
    icon: fieldIcon,
    title: "Register Your Farm",
    text: "Digitally register fields, crops, and soil details in one place.",
  },
  {
    icon: activityIcon,
    title: "Log Farm Activities",
    text: "Track irrigation, spraying, fertilization, and harvest activities.",
  },
  {
    icon: analyticsIcon,
    title: "Get Smart Insights",
    text: "Analyze farm data to improve productivity and decision-making.",
  },
];

const TESTIMONIALS = [
  {
    img: farmer1,
    name: "Ramesh Patil",
    location: "Nashik, Maharashtra",
    quote:
      "Agrove helped me replace notebooks with a simple digital system for my farm.",
  },
  {
    img: farmer2,
    name: "Mahesh Jadhav",
    location: "Sangli, Maharashtra",
    quote:
      "The advisory insights helped me take timely actions during the crop season.",
  },
  {
    img: farmer3,
    name: "Suresh Kulkarni",
    location: "Belgaum, Karnataka",
    quote:
      "Easy to use and very practical for day-to-day farm management.",
  },
];

const BLOGS = [
  {
    img: blog1,
    title: "Why Digital Farm Records Matter",
    desc: "Moving from notebooks to digital records helps farmers improve accuracy, planning, and long-term productivity.",
  },
  {
    img: blog2,
    title: "Planning Crop Activities the Smart Way",
    desc: "Learn how structured activity planning reduces errors and improves seasonal outcomes.",
  },
  {
    img: blog3,
    title: "Using Advisory Insights for Better Decisions",
    desc: "Timely advisory guidance can help farmers act early and protect crop health.",
  },
];


const FAQS = [
  {
    q: "Who can use Agrove?",
    a: "Agrove is designed for small and medium farmers who want to manage farms digitally without technical complexity.",
  },
  {
    q: "Is Agrove suitable for field usage?",
    a: "Yes. Agrove is optimized for tablets and mobile devices used directly in the field.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "No. Agrove is built with a farmer-first approach and an intuitive interface.",
  },
  {
    q: "Can I export my farm data?",
    a: "Yes. You can export activity logs and field records for audits and reporting.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We follow standard security practices to ensure your farm data remains private.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeFab, setActiveFab] = useState(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);


  <style>
    {`
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
`}
  </style>


  return (
    <div className="font-inter text-slate-900 overflow-x-hidden">


      <section className="relative min-h-[90vh] flex items-center">
        {HERO_IMAGES.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <span className="bg-green-600/20 text-green-300 px-4 py-1 rounded-full text-xs font-semibold">
            SMART FARMING PLATFORM
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mt-6">
            Harvest the <span className="text-green-400">Future</span>
          </h1>

          <p className="mt-4 max-w-xl text-slate-200">
            A digital platform to manage farms, track activities, and receive advisory insights.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate(ROUTES.login)}
              className="bg-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Launch My Farm
            </button>
            <button
              onClick={() => navigate(ROUTES.advisory)}
              className="border-2 border-green-400 px-6 py-3 rounded-xl font-semibold text-green-300"
            >
              Expert Advisory
            </button>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14">How Agrove Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow">
              <img src={f.icon} className="w-12 mb-4" />
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-slate-600 mt-2">{f.text}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">


          <div onClick={() => setPlayVideo(true)} className="relative cursor-pointer">
            {!playVideo ? (
              <>
                <img src={demoThumbnail} className="rounded-3xl shadow-xl" />
                <img src={youtubePlay} className="absolute inset-0 m-auto w-20" />
              </>
            ) : (
              <iframe
                className="w-full h-[360px] rounded-3xl"
                src={getYouTubeEmbedUrl(YOUTUBE_URL)}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>


          <div>
            <span className="inline-block bg-green-600/10 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
              Why Agrove
            </span>

            <h2 className="text-4xl font-extrabold mt-4 leading-tight">
              Built for farmers,
              <span className="block text-green-600">
                powered by smart technology
              </span>
            </h2>

            <p className="mt-6 text-slate-600 leading-relaxed">
              Agrove is designed to solve real challenges faced by modern farmers.
              Instead of juggling notebooks, spreadsheets, and scattered tools,
              Agrove brings everything into one unified digital platform.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              From registering fields and logging daily activities to receiving
              actionable advisory insights, Agrove helps farmers make confident,
              data-driven decisions throughout the crop cycle.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              With a focus on simplicity, reliability, and field usability,
              Agrove fits naturally into everyday farming workflows.
            </p>

            <button
              onClick={() => navigate(ROUTES.about)}
              className="mt-8 bg-green-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Learn More About Agrove →
            </button>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img src={mobileMockup} className="rounded-2xl shadow-2xl scale-105" />
          <div>
            <h2 className="text-3xl font-bold">Built for field use</h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li>✔ Tablet-friendly interface</li>
              <li>✔ Simple data entry on the field</li>
              <li>✔ Clear visibility under sunlight</li>
              <li>✔ Designed for real farming conditions</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="relative py-28 text-center text-white">
        <img src={hero2} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <h2 className="relative text-4xl md:text-5xl font-extrabold max-w-4xl mx-auto">
          Our mission is to make crop production more efficient,
          profitable, and sustainable.
        </h2>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted by Farmers</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow text-center">
              <img src={t.img} className="w-28 h-28 rounded-full mx-auto mb-4" />
              <p className="italic text-slate-600">“{t.quote}”</p>
              <h4 className="mt-4 font-semibold">{t.name}</h4>
              <span className="text-sm text-slate-500">{t.location}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Latest from the Agrove Blog
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {BLOGS.map((blog, i) => (
            <div
              key={i}
              onClick={() => navigate("/blog")}
              className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow hover:-translate-y-2 hover:shadow-xl transition"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {blog.desc}
                </p>

                <span className="inline-block mt-4 text-green-600 font-semibold text-sm">
                  Read more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>
        {FAQS.map((f, i) => (
          <div key={i} className="mb-4 border rounded-xl">
            <button
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              className="w-full p-4 flex justify-between font-semibold"
            >
              {f.q}
              <span>{openFAQ === i ? "−" : "+"}</span>
            </button>
            {openFAQ === i && (
              <p className="px-4 pb-4 text-slate-600">{f.a}</p>
            )}
          </div>
        ))}
      </section>

      <section className="bg-gradient-to-r from-green-700 to-emerald-700 text-white py-24 text-center">
        <h2 className="text-4xl font-extrabold">Seed your success today</h2>
        <p className="mt-4 text-green-100">
          Start managing your farm smarter with Agrove.
        </p>
        <button
          onClick={() => navigate(ROUTES.login)}
          className="mt-8 bg-white text-green-700 px-10 py-4 rounded-full font-semibold"
        >
          Get Started Free
        </button>
      </section>

      {/* <button
  onClick={() => navigate("/blog")}
  className="
    fixed bottom-20 right-6 z-50
    bg-emerald-600 text-white
    px-5 py-3 rounded-full
    font-semibold shadow-lg

    animate-pulse

    hover:bg-emerald-700
    hover:scale-105
    hover:shadow-xl

    transition-all duration-300
  "
>
  📝Agrove Blog
</button>
<button
  onClick={() => navigate(ROUTES.about)}
  className="
    fixed bottom-6 right-6 z-50
    bg-green-700 text-white
    px-5 py-3 rounded-full
    font-semibold shadow-lg

    hover:bg-green-800
    hover:scale-105
    hover:shadow-xl

    transition-all duration-300
  "
>
  ℹ️ About Agrove
</button> */}

      <button
        onMouseEnter={() => setActiveFab("blog")}
        onMouseLeave={() => setActiveFab(null)}
        onClick={() => navigate("/blog")}
        className={`
    fixed bottom-24 right-6 z-50
    flex items-center gap-4
    h-16
    rounded-full
    overflow-hidden
    transition-all duration-300 ease-out
    ${activeFab === "blog"
            ? "w-52 bg-emerald-400/90 shadow-lg"
            : "w-16 bg-transparent"}
  `}
      >
        <img
          src={blogIcon}
          alt="Agrove Blog"
          className="w-17 h-17 shrink-0"
        />

        <span
          className={`
      text-white text-lg font-semibold whitespace-nowrap
      transition-all duration-300
      ${activeFab === "blog"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4"}
    `}
        >
          Agrove Blog
        </span>
      </button>

      <button
        onMouseEnter={() => setActiveFab("about")}
        onMouseLeave={() => setActiveFab(null)}
        onClick={() => navigate(ROUTES.about)}
        className={`
    fixed bottom-6 right-6 z-50
    flex items-center gap-4
    h-16
    rounded-full
    overflow-hidden
    transition-all duration-300 ease-out
    ${activeFab === "about"
            ? "w-56 bg-green-400/90 shadow-lg"
            : "w-16 bg-transparent"}
  `}
      >
        <img
          src={aboutIcon}
          alt="About Agrove"
          className="w-17 h-17 shrink-0"
        />

        <span
          className={`
      text-white text-lg font-semibold whitespace-nowrap
      transition-all duration-300
      ${activeFab === "about"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4"}
    `}
        >
          About Agrove
        </span>
      </button>




    </div>
  );
}
<Footer />



