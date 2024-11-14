import { useState, useRef, useEffect } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Transcribing from "./components/Transcribing";
import Information from "./components/Information";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);

  const isAudioAvailable = file || audioStream;
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState(null)
  const [finished, setFinished] = useState(false)

  const worker = useRef(null)

  useEffect(()=>{
    if (worker.current){
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
        type: 'module'
      })
    }
  })

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col items-cen">
        <Header />
        {output? (<Information />) :
        isLoading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            file={file}
            audioStream={audioStream}
            handleAudioReset={handleAudioReset}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <h1 className="text-green-400">Hello, World</h1>
    </div>
  );
}

export default App;
