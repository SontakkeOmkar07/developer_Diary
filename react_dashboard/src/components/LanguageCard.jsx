import React, {  } from "react";
import { useNavigate } from "react-router-dom";
import { CountContext } from "../context_api/CountContext";

export const LanguageCard = ({ curLang,count }) => {
  const { name, color = "bg-slate-900", icon } = curLang;
  const Icon = icon;
  
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/language/${encodeURIComponent(name)}`,
    {state: {color}},
      
      
    );
  };

  return (
    <div
      onClick={handleClick}
      className="
        group relative w-80 h-56 rounded-3xl p-6
        bg-gradient-to-br from-slate-800/80 to-slate-900/90
        border border-white/10
        backdrop-blur-xl
        shadow-xl
        transition-all duration-300 ease-out
        cursor-pointer
        overflow-hidden
        hover:-translate-y-2 hover:shadow-2xl
        hover:ring-2 hover:border-green-500
      "
    >
      <div className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-4 group-hover:ring-indigo-500 pointer-events-none transition-all duration-300"></div>

      <div
        className={`
          ${color}
          w-16 h-16 rounded-xl
          flex items-center justify-center
          text-2xl font-bold text-white
          shadow-lg border border-white/20
          transition-transform duration-300
          group-hover:scale-110
        `}
      >
        {Icon ? <Icon color={color} /> : "</>"}
      </div>

      <div className="mt-6">
        <h1 className="text-2xl font-semibold text-white tracking-wide">
          {name}
        </h1>
        <p className="text-sm text-slate-400 mt-1">{count} fixes available</p>
      </div>

      <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-500 opacity-10 blur-3xl pointer-events-none"></div>
    </div>
  );
};
