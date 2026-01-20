


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import hero1 from "../assets/blog-hero-1.jpg";
import hero2 from "../assets/blog-hero-2.jpg";

import blog1 from "../assets/blog-1-digital-farm.jpg";
import blog2 from "../assets/blog-2-crop-planning.jpg";
import blog3 from "../assets/blog-3-advisory.jpg";

import leafIcon from "../assets/icons/leaf.svg";
import tractorIcon from "../assets/icons/tractor.svg";
import arrowPathIcon from "../assets/icons/arrow-path.svg";
import shieldCheckIcon from "../assets/icons/shield-check.svg";
import arrowsRLIcon from "../assets/icons/arrows-right-left.svg";
import beakerIcon from "../assets/icons/beaker.svg";



const BLOGS = [
  {
    img: blog1,
    title: "Why Digital Farm Records Matter",
    excerpt:
      "Digital records replace notebooks with structured, searchable data that improves accuracy, compliance, and long-term planning.",
    slug: "digital-farm-records",
  },
  {
    img: blog2,
    title: "Planning Crop Activities the Smart Way",
    excerpt:
      "Smart crop planning helps farmers schedule tasks, reduce waste, and achieve better seasonal outcomes.",
    slug: "crop-planning",
  },
  {
    img: blog3,
    title: "Using Advisory Insights for Better Decisions",
    excerpt:
      "Actionable advisory insights help farmers act early, reduce risks, and protect crop health.",
    slug: "advisory-insights",
  },
];

const HERO_IMAGES = [hero1, hero2];

export default function Blog() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-inter text-slate-900 overflow-x-hidden">

    
      <section className="relative h-[70vh] overflow-hidden">
        {HERO_IMAGES.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Agrove Blog"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold bg-green-600/90 text-white rounded-full">
              Agrove Insights
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Agrove Blog
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-white/90">
              Practical insights, best practices, and real-world knowledge to
              help farmers manage their farms smarter.
            </p>
          </div>
        </div>
      </section>

     
<section className="max-w-6xl mx-auto px-6 py-16 text-left">
  <div className="mb-8">
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-100 px-4 py-1 rounded-full">
      🌱 Agrove Knowledge
    </span>

    <h2 className="mt-5 text-4xl font-extrabold text-slate-900 leading-snug">
      Growing smarter with{" "}
      <span className="text-green-700">digital agriculture</span>
    </h2>

    <p className="mt-3 text-lg text-slate-600 max-w-4xl">
      Modern farming demands precision, compliance, and foresight — not just
      experience. Digital tools now play a central role in improving
      productivity and reducing operational risks.
    </p>
  </div>

  <div className="space-y-4 text-lg leading-relaxed text-slate-700 max-w-4xl">
    <p>
      From record-keeping and crop planning to advisory insights and compliance,
      digital agriculture helps farmers reduce uncertainty and make informed
      decisions at every stage of the season.
    </p>

    <p className="text-slate-800 font-medium">
      Agrove connects traditional farming knowledge with modern farm management
      systems.
    </p>
  </div>
</section>



      <section className="bg-slate-50 py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Key agricultural concepts explained
          </h2>
          <p className="text-slate-600 max-w-3xl mb-14">
            Core concepts every farmer should understand to maintain compliance
            and protect long-term farm value.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
  {[
    {
      title: "Certified Organic",
      desc: "Strictly regulated farming without synthetic inputs.",
      icon: leafIcon,
    },
    {
      title: "Conventional Farming",
      desc: "Government-approved fertilizers and pesticides.",
      icon: tractorIcon,
    },
    {
      title: "Transitional Period",
      desc: "Conversion phase before organic certification.",
      icon: arrowPathIcon,
    },
    {
      title: "Buffer Zones",
      desc: "No-spray areas protecting sensitive boundaries.",
      icon: shieldCheckIcon,
    },
    {
      title: "Commingling",
      desc: "Mixing organic and non-organic produce.",
      icon: arrowsRLIcon,
    },
    {
      title: "Residue Testing",
      desc: "Lab analysis ensuring chemical limits.",
      icon: beakerIcon,
    },
  ].map((item, i) => (
    <div
      key={i}
      className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition group"
    >
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 group-hover:bg-green-100 transition">
  <img
  src={item.icon}
  alt={item.title}
  className="w-18 h-18 opacity-90"
/>

</div>


        <h3 className="text-xl font-bold text-green-700">
          {item.title}
        </h3>
      </div>

     
      <p className="text-slate-600 leading-relaxed">
        {item.desc}
      </p>
    </div>
  ))}
</div>

        </div>
      </section>

     
<section className="bg-slate-50 py-24">
  <div className="max-w-5xl mx-auto px-6">

   
    <h2 className="text-3xl font-extrabold text-slate-900 mb-10">
      Mixed conventional and organic operations
    </h2>

    <div className="space-y-8">

     
      <div className="bg-white border-l-4 border-green-600 p-8 rounded-xl shadow-sm hover:shadow-md transition">
        <p className="text-slate-700 leading-relaxed">
          Managing <span className="font-semibold text-slate-900">
          mixed conventional and organic operations
          </span> requires strict discipline and transparency.
          Even minor lapses—such as shared equipment, unclear field boundaries,
          or incomplete records—can introduce contamination risks or lead to
          the loss of organic certification.
        </p>
      </div>

    
      <div className="bg-white border-l-4 border-green-600 p-8 rounded-xl shadow-sm hover:shadow-md transition">
        <p className="text-slate-700 leading-relaxed">
          During inspections, regulators focus heavily on
          <span className="font-semibold text-green-700">
            {" "}traceability
          </span>
          —how inputs are applied, where activities take place, and whether
          organic and non-organic produce remain completely separated throughout
          growing, harvesting, and storage processes.
        </p>
      </div>

    
      <div className="bg-white border-l-4 border-green-600 p-8 rounded-xl shadow-sm hover:shadow-md transition">
        <p className="text-slate-700 leading-relaxed">
          Clearly defined field maps, documented buffer zones, and time-stamped
          activity logs act as a
          <span className="font-semibold text-slate-900">
            {" "}first line of defense
          </span>
          against commingling. These practices not only reduce risk but also
          provide strong evidence during audits and residue testing.
        </p>
      </div>

      
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-xl shadow-lg">
        <p className="text-white text-lg leading-relaxed font-medium">
          With accurate digital records and clearly defined operational
          boundaries, farmers can confidently manage mixed systems while
          protecting organic integrity and preserving long-term farm value.
        </p>
      </div>

    </div>
  </div>
</section>


     
<section className="py-24">
  <div className="max-w-5xl mx-auto px-6">
    <div className="bg-white border border-green-200 rounded-3xl shadow-xl p-10 md:p-14">

      <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
        Agrove Platform
      </span>

      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        Agrove’s role in modern farm compliance
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Agrove enables farmers to maintain accurate digital records, map fields,
        track farm activities, and follow best practices required for regulatory
        and certification compliance.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        By replacing manual paperwork with structured digital logs, Agrove
        reduces inspection risks, improves transparency, and supports long-term
        farm sustainability.
      </p>

      <div className="flex flex-wrap gap-4">
        <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
          ✔ Digital Record Keeping
        </span>
        <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
          ✔ Compliance Ready
        </span>
        <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
          ✔ Inspection Friendly
        </span>
      </div>

    </div>
  </div>
</section>


     
      <section className="max-w-7xl mx-auto px-6 py-28">
        <h2 className="text-4xl font-extrabold text-center mb-14">
          Featured Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {BLOGS.map((blog, i) => (
            <div
              key={i}
              onClick={() => navigate(`/blog/${blog.slug}`)}
              className="group bg-white rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition cursor-pointer"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              <div className="p-8">
                <span className="text-sm font-semibold text-green-600">
                  Agrove Insights
                </span>
                <h3 className="text-xl font-bold mt-3 mb-4 group-hover:text-green-700">
                  {blog.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {blog.excerpt}
                </p>
                <span className="inline-block mt-6 text-green-700 font-semibold">
                  Read article →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

     
      <section className="bg-slate-900 text-white py-28 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          Ready to manage your farm digitally?
        </h2>
        <p className="text-slate-300 max-w-xl mx-auto text-lg">
          Plan better, stay compliant, and make confident decisions with Agrove.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-8 bg-green-600 px-10 py-4 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Get Started with Agrove
        </button>
      </section>
    </div>
  );
}
