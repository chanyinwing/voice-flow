import React, { useEffect } from "react";

export default function FileDisplay(props) {
  const { file, audioStream, handleAudioReset } = props;

  function test(){
    console.log('Testing navigator')
    console.log(navigator.mediaDevices)
  }

  useEffect(()=>{
    console.log(audioStream)
  }, [audioStream])

  return (
    <main className="flex-1 flex flex-col items-center gap-3 sm:gap-4 md:gap-5 justify-center pb-20 max-w-full">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-orange-400 bold">File</span>
      </h1>
      <div className="flex flex-col">
        <h3 className="font-medium">Name</h3>
        <p >{file? file.name: 'Recorded Audio: '}</p>

        <div className="flex my-6 justify-between gap-4 max-w-full">
          <button
            onClick={handleAudioReset}
            className="text-slate-400 hover:text-orange-400 duration-200"
          >
            Reset
          </button>
          <button onClick={test} className="flex items-center gap-2 text-orange-400 py-2 px-4 rounded-lg specialBtn ">
            <p>Transcribe</p>
            <i className="fa-solid fa-pen-nib"></i>
          </button>
        </div>
      </div>
    </main>
  );
}
