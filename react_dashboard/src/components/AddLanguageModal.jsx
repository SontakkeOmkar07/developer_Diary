import React, { useState } from "react";

export const AddLanguageModal = ({ closeModal, onAddLanguage }) => {
  const [languageName, setLanguageName] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = [
    { class: "bg-blue-500" },
    { class: "bg-green-500" },
    { class: "bg-orange-500" },
    { class: "bg-yellow-400" },
    { class: "bg-violet-500" },
    { class: "bg-pink-500" },
    { class: "bg-gray-500" },
  ];

  
  const handleAddUserLanguage = () => {
    if (!languageName || !selectedColor) {
      return alert("Please enter language name & select color");
    }

    onAddLanguage(languageName, selectedColor);
    closeModal();
  };

  return (
    <section className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 w-[420px] rounded-2xl p-6 shadow-2xl border border-white/10">
        <header className="mb-5">
          <h1 className="text-2xl font-bold text-white mb-1">
            Add New Language
          </h1>
          <p className="text-gray-400 text-sm">
            Create a new language category to start tracking errors.
          </p>
        </header>

        <label className="text-white text-sm font-semibold">
          Language Name
        </label>
        <input
          type="text"
          value={languageName}
          onChange={(e) => setLanguageName(e.target.value)}
          placeholder="e.g., Rust, Go, Angular"
          className="w-full mt-2 mb-5 px-3 py-1  rounded-lg bg-slate-900 text-white outline-none focus:ring-1 focus:ring-green-500 placeholder:text-gray-400 transition-all duration-200"
        />

        <h4 className="text-white text-sm font-semibold mb-3">Theme Color</h4>
        <ul className="flex flex-wrap gap-4 mb-6">
          {colors.map(({ class: colorClass }, index) => (
            <li
              key={index}
              onClick={() => setSelectedColor(colorClass)}
              className={`w-9 h-9 rounded-full cursor-pointer border-2 transition-all duration-200 transform
                ${colorClass}
                ${
                  selectedColor === colorClass
                    ? "border-white scale-110 shadow-lg"
                    : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                }
              `}
            />
          ))}
        </ul>

        <section className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="text-gray-300 border-2 border-gray-500 px-4 py-2 rounded-lg hover:text-white hover:border-white transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAddUserLanguage}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
          >
            Add Language
          </button>
        </section>
      </div>
    </section>
  );
};
