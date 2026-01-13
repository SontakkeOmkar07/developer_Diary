import React from "react";

export const Card = ({ error, onClick, handleDelete }) => {
  const { title, message, tags } = error;

  

  return (
    <li
      onClick={onClick}
      className="
        group
        w-full
        p-5
        min-h-[160px]
        rounded-xl
        bg-slate-900
        mt-4
        border border-slate-700
        hover:border-rose-400
        hover:bg-slate-800
        transition-all duration-300 ease-out
        shadow-md hover:shadow-rose-500/20
      "
    >
      <article className="flex flex-col gap-3">
        <h1
          className="
            text-white
            capitalize
            text-lg
            font-semibold
            tracking-wide
            transition-colors duration-300
            group-hover:text-rose-400
          "
        >
          {title}
        </h1>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {message}
        </p>

        <div className="mt-auto flex justify-between">
          <span
            className="
              inline-block
              text-xs
              uppercase
              tracking-wider
              font-medium
              text-rose-300
              bg-rose-500/10
              border border-rose-500/30
              rounded-full
              px-3 py-1
              group-hover:bg-rose-500
              group-hover:text-white
              transition
            "
          >
            {tags}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete();
            }}
            className="rounded-md bg-red-400 hover:bg-red-500 text-white font-semibold px-3 cursor-pointer "
          >
            Delete
          </button>
        </div>
      </article>
    </li>
  );
};
