import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export const MainSection = ({ setShowPage, selectError }) => {
  if (!selectError) {
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

  const { title, message, rootCause,steps } = selectError;


  //after selected error
  return (
    <>
      <section className="bg-gray-100 w-full ">
        <div className="">
          <article className="">
            <p>Error Analysis</p>
            <h1 className="text-2xl">{title}</h1>
            <div>
              <p>{message}</p>
            </div>
            <h1 className="">Root Cause</h1>
            <p>{rootCause}</p>
            <h1>Recommended Fix</h1>
          </article>
 
          <section>
            <ul>
              {steps.map((step,index) => {
                return (
                
                    <li key={index}>
                      <h2>{step.instruction}</h2>

                      <p>Sulution.tsx</p>
                      <p>Copy</p>
                      <pre>{step.code}</pre>
                    </li>
                  
                );
              })}
            </ul>
          </section>
        </div>
      </section>
    </>
  );
};
