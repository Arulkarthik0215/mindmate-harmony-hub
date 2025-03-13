
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import AppLayout from '@/components/Layout/AppLayout';
import PageTransition from '@/components/ui/PageTransition';

const FacialAnalysisModule = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [imageCapture, setImageCapture] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Request camera access when component mounts
  useEffect(() => {
    requestCameraAccess();
    
    // Clean up function to stop camera when component unmounts
    return () => {
      stopCamera();
    };
  }, []);
  
  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraPermission(true);
        toast({
          title: "Camera access granted",
          description: "You can now capture your facial expression for analysis.",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraPermission(false);
      toast({
        variant: "destructive",
        title: "Camera access denied",
        description: "We need camera access to analyze your facial expressions.",
        duration: 5000,
      });
    }
  };
  
  const startCamera = async () => {
    if (cameraPermission === false) {
      // If permission was previously denied, ask again
      requestCameraAccess();
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraPermission(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraPermission(false);
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageDataUrl = canvas.toDataURL('image/png');
      setImageCapture(imageDataUrl);
      
      // Stop the camera after capturing
      stopCamera();
      
      // Simulate analysis
      analyzeImage();
    }
  };
  
  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with timeout (in a real app, this would be an API call)
    setTimeout(() => {
      // Generate random mood for demo
      const moods = ['Happy', 'Calm', 'Neutral', 'Sad', 'Anxious'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      
      setMood(randomMood);
      setConfidence(randomConfidence);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Detected mood: ${randomMood} (${randomConfidence}% confidence)`,
        duration: 3000,
      });
    }, 2000);
  };
  
  const resetAnalysis = () => {
    setMood(null);
    setConfidence(null);
    setImageCapture(null);
    startCamera();
  };
  
  const getMoodColor = (mood: string) => {
    switch(mood) {
      case 'Happy': return 'text-green-500';
      case 'Calm': return 'text-mindmate-400';
      case 'Neutral': return 'text-gray-500';
      case 'Sad': return 'text-blue-500';
      case 'Anxious': return 'text-amber-500';
      default: return 'text-gray-500';
    }
  };
  
  const getMoodEmoji = (mood: string) => {
    switch(mood) {
      case 'Happy': return '😊';
      case 'Calm': return '😌';
      case 'Neutral': return '😐';
      case 'Sad': return '😔';
      case 'Anxious': return '😰';
      default: return '🤔';
    }
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
            <h1 className="text-2xl font-bold mb-6">Facial Analysis</h1>
            <p className="text-muted-foreground mb-8">
              Our AI can detect your mood through facial expressions. Simply take a photo and we'll analyze your emotional state.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6 flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold mb-4">Capture Your Expression</h2>
              
              <div className="relative w-full aspect-video bg-black/10 dark:bg-black/30 rounded-lg overflow-hidden mb-4">
                {cameraPermission === false ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <p className="text-center text-muted-foreground mb-4">
                      Camera access is required to analyze your facial expressions.
                    </p>
                    <Button onClick={requestCameraAccess} className="bg-mindmate-500 hover:bg-mindmate-600">
                      Grant Camera Access
                    </Button>
                  </div>
                ) : imageCapture ? (
                  <img src={imageCapture} alt="Captured face" className="w-full h-full object-cover" />
                ) : (
                  <video 
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Hidden canvas for capturing image */}
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              <div className="flex gap-3">
                {!imageCapture && cameraPermission !== false ? (
                  <Button 
                    onClick={captureImage} 
                    className="bg-mindmate-500 hover:bg-mindmate-600"
                    disabled={!videoRef.current?.srcObject}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Image
                  </Button>
                ) : imageCapture ? (
                  <Button onClick={resetAnalysis} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Take Another
                  </Button>
                ) : null}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-12 h-12 border-4 border-mindmate-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-muted-foreground">Analyzing your expression...</p>
                </div>
              ) : mood ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <span className="text-6xl mb-4 block">{getMoodEmoji(mood)}</span>
                    <h3 className={`text-3xl font-bold ${getMoodColor(mood)}`}>{mood}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Confidence: {confidence}%
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Suggestions based on your mood:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {mood === 'Happy' && (
                        <>
                          <li>Continue activities that bring you joy</li>
                          <li>Share your positive energy with others</li>
                          <li>Journal about what made you happy today</li>
                        </>
                      )}
                      {mood === 'Calm' && (
                        <>
                          <li>Practice mindfulness to maintain this state</li>
                          <li>Consider light meditation or breathing exercises</li>
                          <li>Enjoy the peaceful moment</li>
                        </>
                      )}
                      {mood === 'Neutral' && (
                        <>
                          <li>Try engaging in an activity you enjoy</li>
                          <li>Connect with a friend or loved one</li>
                          <li>Consider a brief walk outside</li>
                        </>
                      )}
                      {mood === 'Sad' && (
                        <>
                          <li>Practice self-compassion and be gentle with yourself</li>
                          <li>Consider talking to someone you trust</li>
                          <li>Try a brief mindfulness exercise to center yourself</li>
                        </>
                      )}
                      {mood === 'Anxious' && (
                        <>
                          <li>Try deep breathing exercises (4-7-8 technique)</li>
                          <li>Ground yourself by naming 5 things you can see</li>
                          <li>Consider stepping away from stressors temporarily</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-muted-foreground">
                    {cameraPermission === false 
                      ? "Please grant camera access to use the facial analysis feature" 
                      : "Capture an image to analyze your mood"}
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

export default FacialAnalysisModule;
