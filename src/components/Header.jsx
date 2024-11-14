import React from "react";

export default function Header() {
  return (
    <header className="flex p-4 items-center justify-between gap-4">
      <a href="/"><h1 className="font-medium">
        Voice<span className="text-orange-400 bold">Flow</span>
      </h1></a>
      <a href="/"><button className="flex items-center gap-2 px-4 py-2 rounded-lg text-orange-400 specialBtn">
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </button></a>
    </header>
  );
}
