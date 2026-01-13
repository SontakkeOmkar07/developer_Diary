import React from "react";
// import { useState } from "react";

export const Container = () => {


    const languageInfo = [{
              tech: "React",
              issue: "useEffect infinite re-render",
              fix: "Fixed dependency array and memoized handler",
            },
            {
              tech: "Java",
              issue: "HashMap key mismatch",
              fix: "Overrode equals() and hashCode() properly",
            },
            {
              tech: "Node.js",
              issue: "JWT token missing in request",
              fix: "Axios interceptor added for Authorization header",
            },];

    const projectData = [

        {
    title: "Language Usage Tracker",
    desc: "Tracks how frequently each programming language is used",
    tech: "React · Context API · Tailwind",
  },
  {
    title: "Java Collections Lab",
    desc: "Hands-on practice with List, Map, Set implementations",
    tech: "Java · OOP · Collections",
  },
  {
    title: "Auth Debug Dashboard",
    desc: "Documents authentication issues and fixes",
    tech: "Node · Express · JWT",
  },
            
          ];



  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-6 py-16">
      <div className="max-w-6xl mx-auto mb-14 text-center">
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
          Dev Diary Dashboard
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A real-time record of my debugging journey, learning progress, and
          development work.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-white mb-6">
          📓 Today’s Dev Diary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition">
            <p className="text-xs text-indigo-400 mb-2">React</p>
            <h3 className="text-white font-semibold mb-1">
              Optimized Component Renders
            </h3>
            <p className="text-slate-400 text-sm">
              Reduced unnecessary re-renders by fixing dependency arrays and
              memoizing callbacks.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-emerald-500 transition">
            <p className="text-xs text-emerald-400 mb-2">Backend</p>
            <h3 className="text-white font-semibold mb-1">
              JWT Token Debugging
            </h3>
            <p className="text-slate-400 text-sm">
              Ensured secure API calls using Axios interceptors for token
              injection.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-400 transition">
            <p className="text-xs text-amber-400 mb-2">Java</p>
            <h3 className="text-white font-semibold mb-1">
              HashMap Key Handling
            </h3>
            <p className="text-slate-400 text-sm">
              Learned proper use of <code>equals()</code> and
              <code>hashCode()</code> to avoid data mismatch issues.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-white mb-6">
          🐞 Debug History
        </h2>

        <div className="space-y-5">
          {languageInfo.map((lang, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-rose-400 transition"
            >
              <p className="text-indigo-400 font-semibold">{lang.tech}</p>
              <p className="text-slate-300 mt-1">
                <span className="text-rose-400">Issue:</span> {lang.issue}
              </p>
              <p className="text-slate-400 mt-1">
                <span className="text-emerald-400">Fix:</span> {lang.fix}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-white mb-6">
          🚀 Mini Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectData.map((project, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700
              hover:scale-[1.03] hover:border-indigo-500 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm mt-2">{project.desc}</p>
              <p className="text-xs text-indigo-400 mt-4">{project.tech}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">
          📈 Learning Progress
        </h2>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <ul className="space-y-3 text-slate-300">
            <li>✅ Java OOPs & Collections</li>
            <li>✅ React Components, Hooks, Context API</li>
            <li>🔄 Backend APIs & Authentication</li>
            <li>⏳ System Design Basics</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
