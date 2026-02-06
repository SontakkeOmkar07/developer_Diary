import React from "react";
import { AiFillCode } from "react-icons/ai";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="text-white text-2xl font-bold tracking-wide font-serif pt-10">
        <AiFillCode className="text-emerald-400 text-3xl" />
        DevDiary<span className="text-emerald-400">.</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">📍 Find Us</h3>
          <p className="text-sm leading-relaxed">
            Kolhapur, Maharashtra
            <br />
            India
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">📞 Call Us</h3>
          <p className="text-sm hover:text-indigo-400 transition cursor-pointer">
            +91 9921684441
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">✉️ Mail Us</h3>
          <p className="text-sm hover:text-indigo-400 transition cursor-pointer">
            support@omkar.dev
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center py-4 text-xs text-slate-500">
        © {new Date().getFullYear()} My Personal Projects
      </div>
    </footer>
  );
};
