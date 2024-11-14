import React, {useState} from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

export default function Information() {

    const [tab, setTab] = useState('translation')

  return (
    <main className="flex-1 flex flex-col items-center gap-3 sm:gap-4 md:gap-5 justify-center pb-20 max-w-full">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-orange-400 bold">Transcription</span>
      </h1>
    <div className="grid grid-cols-2 bg-white shadow rounded-full overflow-hidden items-center ">
        <button onClick={()=>{setTab('transcription')}} className={"px-4 py-2 font-medium duration-200 " + (tab === 'transcription'? 'bg-orange-400 text-white': 'text-orange-400 hover:text-orange-600')}>Transcription</button>
        <button onClick={()=>{setTab('translation')}} className={"px-4 py-2 font-medium duration-200 " + (tab === 'translation'? 'bg-orange-400 text-white': 'text-orange-400 hover:text-orange-600')}>Translation</button>
    </div>
    {tab === 'transcription' ? (<Transcription />): (<Translation />)}
      </main>
  );
}
