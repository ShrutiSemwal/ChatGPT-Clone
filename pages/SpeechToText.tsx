import { useWhisper } from '@chengsokdara/use-whisper'
import { FiberManualRecord, Stop } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-hot-toast'


const SpeechToText = () => {



  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY // YOUR_OPEN_AI_TOKEN
  })
  
  return (
        <div className='flex items-center justify-center h-screen flex-col bg-black'>
             <h1 className='text-white mb-2px font-bold text-2xl mb-8'>ChatGPT Voice Recognition</h1>
            <div className="flex items-center mb-8">
            <button 
                className='micStart w-12 h-12 mr-2 outline-none cursor-pointer rounded bg-gray-500' 
                onClick={() =>startRecording()} 
                style={{ background: recording ? '#e3bfbc' : '#9db0b8' }}>
                    <FiberManualRecord style={{ color: 'red' }}/>
            </button>
            <button 
                className='micStop w-12 h-12 mr-2 outline-none cursor-pointer rounded bg-gray-500' 
                onClick={() => stopRecording()}><Stop />
            </button>
            </div>
        {recording && <CircularProgress />}
        <span className='w-6/12 text-center text-white'>{transcript.text}</span>
        </div>
  )
}

export default SpeechToText