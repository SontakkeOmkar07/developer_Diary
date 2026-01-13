import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CgDanger } from "react-icons/cg";
import { VscQuestion } from "react-icons/vsc";
import { LuCircleCheck } from "react-icons/lu";
import { FaRegCircleDot } from "react-icons/fa6";
import { TbCopy } from "react-icons/tb";
import { BsCheck } from "react-icons/bs";

export const MainSection = ({ setShowPage, selectError }) => {
  
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);

    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 3000);
  };

  if (!selectError  ) {
    return (
      <>
        <main className="flex-1 p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col justify-center items-center text-center">
          <div className="mb-6 flex items-center justify-center w-28 h-28 rounded-full bg-slate-800/60 ring-1 ring-white/10 shadow-lg">
            <IoSearchOutline className="text-5xl text-slate-500" />
          </div>

          <h1 className="text-white text-2xl font-semibold tracking-wide mb-3">
            Select an error to inspect
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Browse the list on the left to find the error you're encountering.
          </p>

          <button
            onClick={() => setShowPage(true)}
            className="
          mt-8
          px-6 py-3
          rounded-lg
          border border-slate-600
          text-slate-300
          hover:text-green-400
          hover:border-green-400
          bg-slate-800/40
          transition-all duration-300
          shadow-md hover:shadow-green-500/20
          font-semibold
          flex items-center justify-center
          gap-2
        "
          >
            + Add First Solution
          </button>
        </main>
      </>
    );
  }

  const { title, message, rootCause, steps } = selectError;

  //after selected error
  return (
    <>
      <section className="w-full bg-slate-900 flex justify-center px-4 py-10">
        <div className="w-full max-w-4xl">
          <article>
            <p className="mt-2 uppercase font-semibold text-gray-400 flex items-center gap-3">
              <CgDanger className="text-red-500 text-lg" />
              Error Analysis
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>

            <div className="mt-5 rounded-md bg-red-400/10 border border-red-500/40 px-4 py-4">
              <p className="text-white font-mono text-sm font-medium">{message}</p>
            </div>

            <hr className="border-gray-700 mt-6" />

            <div className="mt-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                <VscQuestion className="text-blue-500 text-xl" />
                Root Cause
              </h2>

              <p className="mt-3 text-gray-300 leading-relaxed">{rootCause}</p>
            </div>

            <h2 className="mt-10 flex items-center gap-2 text-xl font-semibold text-green-500">
              <LuCircleCheck />
              Recommended Fix
            </h2>
          </article>

          <section className="mt-6">
            <ul className="space-y-8">
              {steps.map((step, index) => (
                <li key={index} className="relative pl-8">
                  <span className="absolute left-0 top-1 flex flex-col items-center ">
                    <FaRegCircleDot className="text-gray-500 text-lg  text-green-600  " />

                    <div className="w-px h-20 bg-gray-400 hover:bg-green-600"></div>
                  </span>

                  <h3 className="text-white font-medium">{step.instruction}</h3>

                  <section className="mt-4 rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-700">
                      <p className="text-sm text-gray-300 font-semibold">
                        Solution.tsx
                      </p>
                      <button
                        onClick={() => handleCopy(step.code, index)}
                        className="text-sm flex items-center gap-1 text-gray-300 hover:text-white transition"
                      >
                        {copiedIndex === index ? (
                          <>
                            <BsCheck className="text-green-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <TbCopy />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="bg-black p-4 text-sm text-white overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </section>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </>
  );
};
