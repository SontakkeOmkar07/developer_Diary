import React from "react";

export const About = () => {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto px-8 py-20 text-slate-200">
          <h1 className="text-4xl font-extrabold mb-8 tracking-tight ">
            About DevDebug
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-slate-300">
            DevDebug is a developer-focused platform built to help programmers
            efficiently track, understand, and resolve coding errors while
            improving their debugging workflow.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            What This Project Does
          </h2>
          <ul className="list-disc pl-8 mb-10 space-y-2 text-slate-300">
            <li>Log and manage common programming errors</li>
            <li>Store reliable solutions for future reference</li>
            <li>Organize issues based on programming languages</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            Tech Stack
          </h2>
          <p className="mb-10 text-slate-300">
            React, JavaScript, Tailwind CSS, React Router, Node.js, Express.js, MYSQL
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            About the Developer
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Hi, I’m Omkar — a full-stack developer passionate about building
            clean, scalable, and practical tools that simplify real-world
            development challenges.
          </p>
        </div>
      </section>
    </>
  );
};
