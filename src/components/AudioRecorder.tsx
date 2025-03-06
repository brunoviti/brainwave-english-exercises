
import { useState, useRef } from 'react';
import { Mic, Square, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AudioRecorderProps {
  onAudioReady: (audioBlob: Blob) => void;
  isProcessing: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioReady, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    setAudioUrl(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      toast.info('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Failed to access microphone. Please check permissions.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      setIsRecording(false);
      toast.info('Recording stopped');
    }
  };
  
  const submitAudio = () => {
    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      onAudioReady(audioBlob);
    } else {
      toast.error('No audio recorded');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-center mb-4">
        {isRecording ? (
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full animate-pulse">
            <Mic className="w-8 h-8 text-red-500" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
            <Mic className="w-8 h-8 text-gray-500" />
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {audioUrl && (
          <div className="w-full">
            <audio src={audioUrl} controls className="w-full" />
          </div>
        )}
        
        <div className="flex justify-center gap-3">
          {!isRecording ? (
            <Button 
              onClick={startRecording} 
              disabled={isProcessing}
              className="bg-brain-articulation hover:bg-brain-articulation/90"
            >
              <Mic className="mr-2 h-4 w-4" /> Start Recording
            </Button>
          ) : (
            <Button 
              onClick={stopRecording} 
              variant="destructive"
            >
              <Square className="mr-2 h-4 w-4" /> Stop Recording
            </Button>
          )}
          
          {audioUrl && (
            <Button 
              onClick={submitAudio} 
              disabled={isProcessing}
              className="bg-primary"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Analyze Audio
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
