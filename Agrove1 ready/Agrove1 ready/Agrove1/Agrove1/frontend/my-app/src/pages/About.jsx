


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


import aboutHero from "../assets/about-hero.jpg";
import aboutStory from "../assets/about-story.jpg";
import missionBg from "../assets/mission-bg.jpg";
import impactImage from "../assets/impact-field.jpg";

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 
  const revealRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

 
  const [counts, setCounts] = useState({
    farms: 0,
    crops: 0,
    effort: 0,
    access: 0,
  });

  const impactRef = useRef(null);
  const hasCounted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted.current) {
          hasCounted.current = true;
          animate("farms", 500);
          animate("crops", 12);
          animate("effort", 30);
          animate("access", 24);
        }
      },
      { threshold: 0.4 }
    );

    if (impactRef.current) observer.observe(impactRef.current);
    return () => observer.disconnect();
  }, []);

  const animate = (key, target) => {
    const duration = 1200;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCounts((prev) => ({
        ...prev,
        [key]: Math.floor(progress * target),
      }));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  return (
    <div className="font-inter text-slate-900 overflow-x-hidden">

     
      <section
        className="relative h-[85vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${aboutHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        <div className="relative max-w-5xl px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            About <span className="text-green-400">Agrove</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-slate-200">
            Building practical digital tools grounded in real agricultural workflows.
          </p>
        </div>
      </section>

     
      <section
        ref={(el) => (revealRefs.current[0] = el)}
        className="max-w-7xl mx-auto px-6 py-28 opacity-0 translate-y-10 transition-all duration-700"
      >
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-8">Our Story</h2>
            <p className="text-xl leading-relaxed text-slate-700">
              Agrove was created to solve a common problem — scattered records,
              delayed decisions, and manual effort slowing farmers down.
            </p>
            <p className="mt-6 text-xl leading-relaxed text-slate-700">
              We focus on clarity, accuracy, and ease of use so technology
              supports farmers instead of complicating their work.
            </p>
          </div>
          <img
            src={aboutStory}
            className="rounded-3xl shadow-2xl hover:scale-[1.02] transition"
            alt="Our Story"
          />
        </div>
      </section>

     
      <section
        className="relative py-32 text-center text-white"
        style={{
          backgroundImage: `url(${missionBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-green-900/80" />
        <div className="relative max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-8">Our Mission</h2>
          <p className="text-2xl text-green-100">
            To make farm management efficient, reliable, and transparent
            through accessible digital tools.
          </p>
        </div>
      </section>

      
      <section ref={impactRef} className="max-w-7xl mx-auto px-6 py-28">
        <h2 className="text-4xl font-extrabold text-center mb-20">
          Our Impact
        </h2>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          <img
            src={impactImage}
            className="rounded-3xl shadow-2xl"
            alt="Impact"
          />

          <div className="grid grid-cols-2 gap-10">
            {[
              { label: "Farms Digitized", value: `${counts.farms}+` },
              { label: "Crop Types Managed", value: `${counts.crops}+` },
              { label: "Manual Effort Reduced", value: `${counts.effort}%` },
              { label: "Data Availability", value: `${counts.access}/7` },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-10 shadow-xl text-center hover:-translate-y-2 transition"
              >
                <h3 className="text-5xl font-extrabold text-green-600">
                  {item.value}
                </h3>
                <p className="mt-4 text-lg font-semibold text-slate-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section
        ref={(el) => (revealRefs.current[1] = el)}
        className="max-w-7xl mx-auto px-6 py-28 opacity-0 translate-y-10 transition-all duration-700"
      >
        <h2 className="text-4xl font-extrabold text-center mb-20">
          Why Agrove?
        </h2>

        <div className="grid md:grid-cols-4 gap-10">
          {[
            {
              title: "Built for Agriculture",
              text: "Designed specifically around real agricultural workflows, not generic software assumptions.",
            },
            {
              title: "Reduces Paperwork",
              text: "Eliminates notebooks and scattered files with structured digital records.",
            },
            {
              title: "Improves Decisions",
              text: "Clear data history enables better planning, analysis, and accountability.",
            },
            {
              title: "Field-Ready Design",
              text: "Optimized for mobile and tablet use directly in farm conditions.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-bold mb-4 text-green-700">
                {item.title}
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      
      <section
        ref={(el) => (revealRefs.current[2] = el)}
        className="bg-gradient-to-br from-green-50 to-emerald-50 py-28 opacity-0 translate-y-10 transition-all duration-700"
      >
        <h2 className="text-4xl font-extrabold text-center mb-20">
          Our Commitment to Our Growers
        </h2>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            "Farmer-first design focused on simplicity and clarity",
            "Reliable and secure data handling across seasons",
            "Continuous improvement driven by real field feedback",
          ].map((text, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-10 shadow-xl text-center hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <p className="text-xl font-semibold text-slate-700 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

     
      <section
        ref={(el) => (revealRefs.current[3] = el)}
        className="bg-slate-900 py-28 opacity-0 translate-y-10 transition-all duration-700"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-20">
          Agrove vs Traditional Farm Records
        </h2>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div className="bg-slate-800 rounded-3xl p-10">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Traditional Methods
            </h3>
            <ul className="space-y-4 text-lg text-slate-300">
              <li>• Paper notebooks and manual logs</li>
              <li>• Scattered, unstructured information</li>
              <li>• Higher risk of data loss</li>
              <li>• Time-consuming analysis</li>
            </ul>
          </div>

          <div className="bg-green-700 rounded-3xl p-10">
            <h3 className="text-2xl font-bold mb-6 text-white">
              With Agrove
            </h3>
            <ul className="space-y-4 text-lg text-green-100">
              <li>• Centralized digital records</li>
              <li>• Real-time visibility</li>
              <li>• Secure and reliable storage</li>
              <li>• Faster, informed decisions</li>
            </ul>
          </div>
        </div>
      </section>

   
      <section className="bg-green-700 py-28 text-center text-white">
        <h2 className="text-5xl font-extrabold">
          Grow Smarter with Agrove
        </h2>
        <p className="mt-8 text-xl text-green-100">
          Bring clarity, control, and confidence to your farm.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-12 bg-white text-green-700 px-14 py-4 rounded-full font-semibold text-lg hover:scale-105 transition"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}
