
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from "@/hooks/use-toast";
import AppLayout from '@/components/Layout/AppLayout';
import PageTransition from '@/components/ui/PageTransition';

const VoiceAnalysisModule = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  
  // Request microphone access when component mounts
  useEffect(() => {
    checkMicrophonePermission();
    
    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        const tracks = mediaRecorderRef.current.stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);
  
  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicPermission(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setMicPermission(false);
      toast({
        variant: "destructive",
        title: "Microphone access denied",
        description: "We need microphone access to analyze your voice.",
        duration: 5000,
      });
    }
  };
  
  const requestMicrophoneAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission(true);
      toast({
        title: "Microphone access granted",
        description: "You can now record your voice for analysis.",
        duration: 3000,
      });
    } catch (err) {
      console.error("Error requesting microphone access:", err);
      setMicPermission(false);
    }
  };
  
  const startRecording = async () => {
    if (micPermission === false) {
      // If permission was previously denied, ask again
      requestMicrophoneAccess();
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        // In a real app, you would send the audio data to your backend for analysis
        analyzeMockVoiceData();
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording started",
        description: "Speak clearly about how you're feeling.",
        duration: 3000,
      });
      
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setMicPermission(false);
      toast({
        variant: "destructive",
        title: "Microphone access denied",
        description: "We need microphone access to analyze your voice.",
        duration: 5000,
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      const tracks = mediaRecorderRef.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setIsRecording(false);
      setIsAnalyzing(true);
      
      toast({
        title: "Recording complete",
        description: "Analyzing your voice patterns...",
        duration: 2000,
      });
    }
  };
  
  const resetAnalysis = () => {
    setAnalysisResults(null);
    setRecordingTime(0);
  };
  
  const analyzeMockVoiceData = () => {
    // Simulate analysis delay (in a real app, this would be an API call)
    setTimeout(() => {
      // Mock analysis results
      const mockResults = {
        emotionalState: {
          primary: "Neutral",
          secondary: "Slight anxiety",
          confidence: 78
        },
        voiceAttributes: {
          tone: 65, // 0-100 scale: low to high
          pace: 42, // 0-100 scale: slow to fast
          volume: 58, // 0-100 scale: soft to loud
          clarity: 72, // 0-100 scale: unclear to clear
        },
        recommendations: [
          "Your voice indicates mild anxiety. Consider practicing deep breathing exercises.",
          "Try speaking a bit more slowly to reduce stress signals in your tone.",
          "Regular mindfulness practices may help stabilize your emotional patterns."
        ]
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Detected emotion: ${mockResults.emotionalState.primary}`,
        duration: 3000,
      });
    }, 2000);
  };
  
  // Format seconds into mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AppLayout>
      <PageTransition>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-6">Voice Analysis</h1>
            <p className="text-muted-foreground mb-8">
              Our AI can analyze your voice patterns to detect emotional states and help identify potential mental health concerns.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Record Your Voice</h2>
              
              <div className="flex flex-col items-center justify-center py-8">
                {micPermission === false ? (
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground">
                      Microphone access is required to analyze your voice.
                    </p>
                    <Button onClick={requestMicrophoneAccess} className="bg-mindmate-500 hover:bg-mindmate-600">
                      Grant Microphone Access
                    </Button>
                  </div>
                ) : isRecording ? (
                  <div className="space-y-6 w-full">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-red-500">
                          <Mic className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping"></div>
                      </div>
                    </div>
                    
                    <div className="text-center font-mono text-xl">{formatTime(recordingTime)}</div>
                    
                    <div className="flex justify-center">
                      <Button 
                        onClick={stopRecording}
                        variant="outline"
                        className="bg-white hover:bg-gray-100 border-red-500 text-red-500"
                      >
                        <Square className="mr-2 h-4 w-4" />
                        Stop Recording
                      </Button>
                    </div>
                  </div>
                ) : isAnalyzing ? (
                  <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-10 w-10 text-mindmate-500 animate-spin" />
                    <p className="text-muted-foreground">Analyzing your voice patterns...</p>
                  </div>
                ) : (
                  <div className="space-y-6 w-full">
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        {analysisResults 
                          ? "Voice analysis complete." 
                          : "Press the button below and say how you're feeling today."}
                      </p>
                      
                      {analysisResults ? (
                        <Button
                          onClick={resetAnalysis}
                          variant="outline"
                          className="mx-auto"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Record Again
                        </Button>
                      ) : (
                        <Button
                          onClick={startRecording}
                          className="bg-mindmate-500 hover:bg-mindmate-600 mx-auto"
                        >
                          <Mic className="mr-2 h-4 w-4" />
                          Start Recording
                        </Button>
                      )}
                    </div>
                    
                    {recordingTime > 0 && !isRecording && !isAnalyzing && (
                      <div className="text-center text-sm text-muted-foreground">
                        Recorded for {formatTime(recordingTime)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Analysis Results</h2>
              
              {analysisResults ? (
                <div className="space-y-6">
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <h3 className="font-medium mb-2">Emotional State</h3>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{analysisResults.emotionalState.primary}</span>
                      <span className="text-xs text-muted-foreground">
                        {analysisResults.emotionalState.confidence}% confidence
                      </span>
                    </div>
                    <Progress value={analysisResults.emotionalState.confidence} className="h-2" />
                    {analysisResults.emotionalState.secondary && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Secondary: {analysisResults.emotionalState.secondary}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Voice Attributes</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tone</span>
                          <span className="text-xs">{analysisResults.voiceAttributes.tone}%</span>
                        </div>
                        <Progress value={analysisResults.voiceAttributes.tone} className="h-1.5" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Pace</span>
                          <span className="text-xs">{analysisResults.voiceAttributes.pace}%</span>
                        </div>
                        <Progress value={analysisResults.voiceAttributes.pace} className="h-1.5" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Slow</span>
                          <span>Fast</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Volume</span>
                          <span className="text-xs">{analysisResults.voiceAttributes.volume}%</span>
                        </div>
                        <Progress value={analysisResults.voiceAttributes.volume} className="h-1.5" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Soft</span>
                          <span>Loud</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Clarity</span>
                          <span className="text-xs">{analysisResults.voiceAttributes.clarity}%</span>
                        </div>
                        <Progress value={analysisResults.voiceAttributes.clarity} className="h-1.5" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Unclear</span>
                          <span>Clear</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Recommendations</h3>
                    <ul className="space-y-2">
                      {analysisResults.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm flex gap-2">
                          <span className="text-mindmate-600 dark:text-mindmate-400">•</span>
                          <span className="text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-muted-foreground">
                    {micPermission === false 
                      ? "Please grant microphone access to use the voice analysis feature" 
                      : "Record your voice to receive a detailed analysis"}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </AppLayout>
  );
};

export default VoiceAnalysisModule;
