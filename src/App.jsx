import { useState } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'

function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)

  const isAudioAvailable = file || audioStream

  function handleAudioReset(){
    setFile(null);
    setAudioStream(null);
  }

  return (
   <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
    <section className='min-h-screen flex flex-col items-cen'>
      <Header />
      {isAudioAvailable ? (
        <FileDisplay file={file} audioStream={audioStream} handleAudioReset={handleAudioReset}/>
      ) : (<HomePage setFile={setFile} setAudioStream={setAudioStream} />)}
    </section>
    <h1 className='text-green-400'>Hello, World</h1>
   </div>
  )
}

export default App