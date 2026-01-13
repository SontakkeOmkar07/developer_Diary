import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ListCard } from "./ListCard";

export const AddErrorModal = ({ onClose, onSave }) => {
  const [storeInput, setStoreInput] = useState({
    title: "",
    message: "",
    rootCause: "",
    tags: "",
    steps: [{ instruction: "", code: "" }],
  });

  const isFormValid = () => {
    const { title, message, rootCause, tags, steps } = storeInput;
    return (
      title &&
      message &&
      rootCause &&
      tags &&
      steps.every((step) => step.instruction.trim() && step.code.trim())
    );
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

     if (!isFormValid()) {
      alert("Please fill all required fields");
      return;
    }

   try {

    
    

    // Add to parent state
    await onSave(storeInput);
    onClose();
    
   } catch (error) {
    console.error(error.message);
    
   }
  };

  const addSteps = () => {
    setStoreInput((prev) => ({
      ...prev,
      steps: [...prev.steps, { instruction: "", code: "" }],
    }));
  };

  const updateSteps = (index, field, value) => {
    const newSteps = storeInput.steps.map((s,i) =>

      i === index ? {...s, [field]: value} : s
    );

    setStoreInput({ ...storeInput, steps: newSteps });
  };

  return (
    <section
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 text-white w-[720px] max-h-[90vh] rounded-2xl p-8 shadow-2xl ring-1 ring-white/10 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-6 flex-shrink-0">
          <h1 className="text-xl font-serif flex justify-between items-center tracking-wide">
            Add New Error Solution
            <span onClick={onClose} className="cursor-pointer">
              <RxCross2 className="text-2xl text-gray-400 hover:text-white transition-colors" />
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Contribute a new error and its fix to the database.
          </p>
        </header>

        <form
        onSubmit={handleSubmit}
   

          className="space-y-6 overflow-y-auto pr-3 flex-1 scrollbar scrollbar-thumb-slate-600 scrollbar-track-slate-800 scroll-smooth"
        >
          <div>
            <label className="text-sm text-white font-semibold">
              Error Title
            </label>
            <input
              required
              value={storeInput.title}
              onChange={(e) =>
                setStoreInput({ ...storeInput, title: e.target.value })
              }
              type="text"
              placeholder="e.g., Uncaught ReferenceError"
              className="w-full mt-2 p-3 rounded-xl bg-slate-800 ring-1 ring-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-white font-semibold">
                Error Message
              </label>
              <textarea
                value={storeInput.message}
                required
                onChange={(e) =>
                  setStoreInput({ ...storeInput, message: e.target.value })
                }
                rows={4}
                placeholder="Paste the error message here..."
                className="w-full mt-2 p-3 rounded-xl bg-slate-800 ring-1 ring-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition"
              />
            </div>

            <div>
              <label className="text-sm text-white font-semibold">
                Root Cause
              </label>
              <textarea
                required
                value={storeInput.rootCause}
                onChange={(e) =>
                  setStoreInput({ ...storeInput, rootCause: e.target.value })
                }
                rows={4}
                placeholder="Why does this happen?"
                className="w-full mt-2 p-3 rounded-xl bg-slate-800 ring-1 ring-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-white font-semibold">
              Tags (comma separated)
            </label>
            <input
              required
              value={storeInput.tags}
              onChange={(e) =>
                setStoreInput({ ...storeInput, tags: e.target.value })
              }
              type="text"
              placeholder="e.g., runtime, syntax, beginners"
              className="w-full mt-2 p-3 rounded-xl bg-slate-800 ring-1 ring-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <section className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-white tracking-wide text-lg">
                Solution Steps
              </h2>
              <button
                type="button"
                onClick={addSteps}
                className="text-green-400 text-sm hover:text-green-500 font-semibold transition"
              >
                +Add Step
              </button>
            </div>

            <div className="bg-slate-800/70 p-5 rounded-2xl ring-1 ring-slate-700 space-y-4">
              <ul>
                {storeInput.steps.map((step, index) => (
                  <ListCard
                    key={index}
                    index={index}
                    steps={step}
                    updateSteps={updateSteps}
                  />
                ))}
              </ul>
            </div>
          </section>
        

        <footer className="flex justify-end gap-4 mt-6 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg ring-1 ring-slate-600 text-slate-300 hover:text-white hover:ring-slate-400 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            
            
            disabled={!isFormValid()}
            className={`px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition ${
              isFormValid()
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-slate-600 text-slate-400 cursor-not-allowed"
            }`}
          >
            Save Solution
          </button>
        </footer>
        </form>
      </div>
    </section>
  );
};
