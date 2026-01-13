import React from "react";

export const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <form className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8 space-y-5">
        <h1 className="text-3xl font-bold text-center text-white">
          Contact Us
        </h1>

        <div>
          <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none resize-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};
