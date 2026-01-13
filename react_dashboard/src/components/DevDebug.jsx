import React, { useEffect, useState } from "react";
import { LanguageCard } from "./LanguageCard";
import { AddLanguageModal } from "./AddLanguageModal";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa6";
import { FaJava } from "react-icons/fa";
import { IoLogoPython } from "react-icons/io5";
import { languageIconMap } from "../constants/languageIconMap";
import { Name } from "./Name";
import { IoAddSharp } from "react-icons/io5";
import { CountContext } from "../context_api/CountContext";
import { getAllLanguageCount } from "../api/GetApi";
import { Header } from "./Header";
import { Container } from "./Container";

export const DevDebug = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const [languages, setLanguages] = useState([
    { name: "React", icon: FaReact, color: "#007FFF" },
    { name: "Node.js", icon: FaNode, color: "#55DD33" },
    { name: "Java", icon: FaJava, color: "#FF5800" },
    { name: "Python", icon: IoLogoPython, color: "#FFFF00" },
  ]);

  const [languageCounts, setLanguageCounts] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const normalizeLanguage = (name) => {
    return name.toLowerCase().replace(".js", "").replace(/\s+/g, "");
  };

  //handle lang
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

    const Icon = languageIconMap[key];
    if (!Icon) {
      alert("Language icon not found");
      return;
    }
    setLanguages((prev) => [...prev, { name, icon: Icon, color }]);
  };

  // handle count

  //   const {languageCount} = useContext(CountContext);

  // console.log("languageCount:", languageCount);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(true);
  });


  useEffect(() => {

    if(!isLoggedIn) return;

    const fetchedData = async () => {
      try {
        const res = await getAllLanguageCount();

        console.log(languageCounts);

        console.log(res.data.data);

        setLanguageCounts(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchedData();
  }, [isLoggedIn]);

  return (
    <>
      <Header />
      <section className="min-h-screen bg-slate-900 p-8">
        <Name />

        <ul className="flex justify-center gap-8 flex-wrap mt-8">
          {languages.map((curLang) => {
            const countLang = languageCounts.find(
              (count) => count.language === normalizeLanguage(curLang.name)
            );

            return (
              <LanguageCard
                curLang={curLang}
                key={curLang.name}
                normalizeLanguage={normalizeLanguage}
                count={countLang?.count || 0}
              />
            );
          })}

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
<Container /> 

      {showModal && (
        <AddLanguageModal
          onAddLanguage={handleAddLanguage}
          closeModal={closeModal}
        />
      )}

       
    </>
   
  );
};
