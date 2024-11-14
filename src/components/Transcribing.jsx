import React from "react";

export default function Transcribing() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-8">
      <div className="flex flex-col gap-2">
        <h1 className=" text-orange-400 bold font-semibold text-4xl sm:text-5xl md:text-6xl">
          Transcribing
        </h1>
        <p className="text-center">We are doing the magic!</p>
      </div>
      <div className="flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full">
        {[0, 1, 2].map((val) => {
          return (
            <div
              key={val}
              className={
                "rounded-full h-2 sm:h-3 bg-slate-300 loading" +
                ` loading${val}`
              }
            ></div>
          );
        })}
      </div>
    </main>
  );
}
