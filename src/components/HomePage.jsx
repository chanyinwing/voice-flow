import React, {useState, useRef, useEffect} from "react";

export default function HomePage(props) {
  const { setAudioStream, setFile } = props;

  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [audioChunks, setAudioChunks] = useState([]); 
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null)

  const mimeType = 'audio/webm'

  async function startRecording(){
    let tempStream;

    console.log('Start Recording')

    try{
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true, 
        video: false
      })
      tempStream = streamData 
    }catch(err) {
      console.log(err.message)
      return
    }

    //create new Media recorder instance using the stream
    const media = new MediaRecorder(tempStream, {mimeType: mimeType})
    mediaRecorder.current = media

    mediaRecorder.current.start()
    let localAudioChunk = []
    mediaRecorder.current.ondataavailable = (event) => {
      if (!event.data || event.data.size === 0) return
      localAudioChunk.push(event.data)
    }
    setAudioChunks(localAudioChunk) ;
    setRecordingStatus('recording')
  }
  
  async function stopRecording(){
    setRecordingStatus('inactive')
    console.log('Stop recording')

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = ()=>{
      const audioBlob = new Blob(audioChunks, {type: mimeType}) 
      setAudioStream(audioBlob);
      setAudioChunks([])
      setDuration(0)
    }
  }

  useEffect(()=>{
    if(recordingStatus === 'inactive') return
    
    const intervalId = setInterval(()=>{
      setDuration(curr => curr + 1 )
    }, 1000)

    return () => clearInterval(intervalId)
  })

  return (
    <main className="flex-1 flex flex-col items-center gap-3 sm:gap-4 md:gap-5 justify-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Voice<span className="text-orange-400 bold">Flow</span>
      </h1>
      <h3 className="font-medium md:text-lg ">
        Record
        <span className="text-orange-400">&rarr;</span>Transcribe
        <span className="text-orange-400">&rarr;</span>Translate
      </h3>
      <button onClick={recordingStatus === 'inactive'? startRecording: stopRecording} className="flex items-center text-base justify-between gap-4 w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl">
        <p className="text-orange-400">{recordingStatus === 'inactive'? 'Record' : 'Stop Recording'}</p>
        <div className="flex items-center gap-2 ">
          {duration !== 0 && (<p className="text-sm text-slate-400">{duration}s</p>)}
          <i className={"fa-solid duration-200 fa-microphone" + (recordingStatus === 'recording'? "text-rose-300": "")}></i>
        </div>
      </button>
      <p className="text-base">
        Or <label className="text-orange-400 cursor-pointer hover:text-orange--600 duration-200">
          Upload
          <input
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            type="file"
            accept=".mp3, .wave"
          />
        </label>{" "}
        a mp3 file
      </p>
      <p className="italic text-slate-300">Free now free forever</p>
    </main>
  );
}
