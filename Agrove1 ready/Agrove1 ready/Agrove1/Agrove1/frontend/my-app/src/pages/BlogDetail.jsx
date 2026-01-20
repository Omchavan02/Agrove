

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


import digitalHero from "../assets/blog-detail-digital-records.jpg";
import planningHero from "../assets/blog-detail-crop-planning.jpg";
import advisoryHero from "../assets/blog-detail-advisory.jpg";

import farmerTablet from "../assets/blog-farmer-using-tablet.jpg";
import recordsDashboard from "../assets/blog-records-dashboard.jpg";
import fieldPlanning from "../assets/blog-field-planning.jpg";
import cropCalendar from "../assets/blog-crop-calendar.jpg";
import advisoryAlerts from "../assets/blog-advisory-alerts.jpg";
import farmAnalysis from "../assets/blog-farm-analysis.jpg";


const BLOG_CONTENT = {
  "digital-farm-records": {
    title: "Why Digital Farm Records Matter",
    hero: digitalHero,
    content: (
      <>
       
        <p>
          Farming decisions were traditionally made using memory, experience,
          and handwritten notes. While this worked for small farms, modern
          agriculture demands accuracy, traceability, and long-term visibility.
        </p>

        <p>
          Digital farm records replace scattered notebooks with a single,
          structured system — making it easier to track activities, inputs,
          and outcomes across seasons.
        </p>

       
        <div className="my-16">
          <img
            src={recordsDashboard}
            alt="Digital farm records dashboard"
            className="rounded-3xl shadow-2xl w-full"
          />
          <p className="mt-4 text-slate-600">
            Centralized dashboards help farmers review crop history, input usage,
            and seasonal performance at a glance.
          </p>
        </div>

        
        <div className="grid md:grid-cols-2 gap-8 my-16">
          <div className="bg-slate-50 p-8 rounded-2xl border">
            <h3 className="font-bold text-lg mb-3">Problems with manual records</h3>
            <p className="text-slate-600">
              Paper logs are easily lost, damaged, or forgotten. Inconsistent
              formats and missing dates create serious gaps during inspections.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border">
            <h3 className="font-bold text-lg mb-3">Why accuracy matters</h3>
            <p className="text-slate-600">
              Accurate records help farmers analyze what worked, what failed,
              and how to improve productivity season after season.
            </p>
          </div>
        </div>

      
        <div className="grid md:grid-cols-2 gap-10 items-center my-20">
          <img
            src={farmerTablet}
            alt="Farmer using tablet in field"
            className="rounded-3xl shadow-xl"
          />
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Records that work in the field
            </h3>
            <p className="text-slate-700">
              Digital records allow farmers to log activities directly from the
              field — saving time, reducing errors, and ensuring data is always
              up to date.
            </p>
          </div>
        </div>
        

        <div className="bg-green-50 border-l-4 border-green-600 p-8 rounded-xl my-20">
          <h3 className="text-xl font-bold mb-4">
            How Agrove simplifies record-keeping
          </h3>
          <p>
            Agrove helps farmers maintain structured digital logs, generate
            inspection-ready reports, and build reliable farm histories —
            without technical complexity.
          </p>
        </div>
      </>
    ),
  },

  "crop-planning": {
    title: "Planning Crop Activities the Smart Way",
    hero: planningHero,
    content: (
      <>
        <p>
          Successful farming depends on timing. Missing a spray window or
          delaying irrigation can significantly reduce yield.
        </p>

        <p>
          Structured crop planning helps farmers organize tasks, manage labor,
          and respond quickly to weather or market changes.
        </p>

        
        <div className="my-16">
          <img
            src={fieldPlanning}
            alt="Field planning overview"
            className="rounded-3xl shadow-2xl w-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10 my-16">
          <div>
            <h3 className="text-xl font-bold mb-3">Without planning</h3>
            <p className="text-slate-600">
              Activities overlap, inputs are wasted, and important tasks are
              rushed under pressure.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">With smart planning</h3>
            <p className="text-slate-600">
              Farmers gain clarity on what needs to be done, when, and why —
              improving efficiency across the entire season.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center my-20">
          <img
            src={cropCalendar}
            alt="Crop calendar planning"
            className="rounded-3xl shadow-xl"
          />
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Visual crop calendars
            </h3>
            <p className="text-slate-700">
              Visual timelines help farmers track upcoming activities, plan
              resources, and avoid last-minute decisions.
            </p>
          </div>
        </div>
      </>
    ),
  },

  "advisory-insights": {
    title: "Using Advisory Insights for Better Decisions",
    hero: advisoryHero,
    content: (
      <>
        <p>
          Crop risks rarely appear overnight. Pests, diseases, and nutrient
          deficiencies often show early warning signs.
        </p>

        <p>
          Advisory insights help farmers act early — preventing small problems
          from turning into major losses.
        </p>

        <div className="my-16">
          <img
            src={advisoryAlerts}
            alt="Crop advisory alerts"
            className="rounded-3xl shadow-2xl w-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center my-20">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Early action saves crops
            </h3>
            <p className="text-slate-700">
              Timely guidance allows preventive measures instead of costly
              corrective treatments.
            </p>
          </div>

          <img
            src={farmAnalysis}
            alt="Farm data analysis"
            className="rounded-3xl shadow-xl"
          />
        </div>

        <div className="bg-green-50 border-l-4 border-green-600 p-8 rounded-xl my-20">
          <h3 className="text-xl font-bold mb-4">
            Agrove’s advisory advantage
          </h3>
          <p>
            By combining field data with advisory insights, Agrove helps farmers
            make confident, data-driven decisions at the right time.
          </p>
        </div>
      </>
    ),
  },
};

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = BLOG_CONTENT[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Blog not found</h2>
          <button
            onClick={() => navigate("/blog")}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-inter text-slate-900 overflow-x-hidden">
      
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        <img
          src={blog.hero}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold text-center px-6 max-w-5xl">
          {blog.title}
        </h1>
      </section>

    
      <section className="max-w-5xl mx-auto px-6 py-24 text-lg leading-relaxed text-slate-700 space-y-6">
        {blog.content}

        <button
          onClick={() => navigate("/blog")}
          className="mt-20 bg-green-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-green-700 transition"
        >
          ← Back to Blog
        </button>
      </section>
    </div>
  );
}






