import React, { useState } from "react";
import { LanguageCard } from "./LanguageCard";
import { AddLanguageModal } from "./AddLanguageModal";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa6";
import { FaJava } from "react-icons/fa";
import { IoLogoPython } from "react-icons/io5";
import { languageIconMap } from "../constants/languageIconMap";
import { Header } from "./Header";
import { IoAddSharp } from "react-icons/io5";
// import { LanguagePage } from "../pages/LanguagePage";

export const DevDebug = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const [languages, setLanguages] = useState([
    { name: "React", fixes: 3, icon: FaReact, color: "#007FFF" },
    { name: "Node.js", fixes: 2, icon: FaNode, color: "#55DD33" },
    { name: "Java", fixes: 2, icon: FaJava, color: "#FF5800" },
    { name: "Python", fixes: 2, icon: IoLogoPython, color: "#FFFF00" },
  ]);

  const normalizeLanguage = (name) => {
    return name.toLowerCase().replace(".js", "").replace(/\s+/g, "");
  };

  const handleAddLanguage = (name, color) => {
    const key = normalizeLanguage(name);

    if (!languageIconMap[key]) {
      alert("Language not supported.");
      return;
    }

    const alreadyAdded = languages.some(
      (lang) => normalizeLanguage(lang.name) === key
    );

    if (alreadyAdded) {
      alert("Language already exists.");
      return;
    }

    const Icon = languageIconMap[key] || FaNode;
    setLanguages((prev) => [...prev, { name, icon: Icon, color, fixes: 0 }]);
  };

  return (
    <>
      <section className="min-h-screen bg-slate-900 p-8">
        <Header />

        <ul className="flex justify-center gap-8 flex-wrap mt-8">
          {languages.map((curLang) => (
            <LanguageCard
              curLang={curLang}
              key={curLang.name}
              normalizeLanguage={normalizeLanguage}
            />
          ))}

          <button
            onClick={handleClick}
            className={`
    group w-60 h-52 rounded-2xl
    bg-slate-900 
    border-2 border-dashed border-gray-400
    flex flex-col items-center justify-center gap-3
    text-white font-semibold
    cursor-pointer
    shadow-lg
    transform transition-all duration-300
    hover:scale-105 hover:shadow-2xl hover:border-green-500
  `}
          >
            <div
              className="
      w-16 h-16 rounded-full
      bg-slate-800 backdrop-blur-md
      flex items-center justify-center
      text-3xl font-bold
      shadow-lg
      transition-transform duration-300
      group-hover:scale-110
    "
            >
              <IoAddSharp />
            </div>

            <p className="text-lg font-semibold">Add Language</p>
            <p className="text-sm text-white/70">Don't see your stack?</p>
          </button>
        </ul>
      </section>

      {showModal && (
        <AddLanguageModal
          onAddLanguage={handleAddLanguage}
          closeModal={closeModal}
        />
      )}

      
    </>
  );
};
