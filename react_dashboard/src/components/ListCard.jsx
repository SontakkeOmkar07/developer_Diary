import React from "react";

export const ListCard = ({ steps, updateSteps, index }) => {
  return (
    <li className="mb-4">
      <article className="bg-slate-800/70 p-5 rounded-2xl ring-1 ring-slate-700 shadow-lg space-y-3 hover:ring-green-500 transition-all duration-200">
        <label className="text-sm text-gray-300 font-semibold">
          Step {index + 1} Instruction
        </label>

        <input
          type="text"
          required
          value={steps.instruction}
          onChange={(e) => updateSteps(index, "instruction", e.target.value)}
          placeholder="Describe what to do..."
          className="w-full p-3 rounded-lg bg-slate-900 ring-1 ring-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        <label className="text-sm font-semibold text-gray-300 mt-2 block">
          Code Snippet (optional)
        </label>

        <textarea
          rows={4}
          value={steps.code}
          onChange={(e) => updateSteps(index, "code", e.target.value)}
          placeholder="// Optional code snippet"
          className="w-full p-3 rounded-lg bg-slate-900 ring-1 ring-slate-700 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition"
        />
      </article>
    </li>
  );
};
