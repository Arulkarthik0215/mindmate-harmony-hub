
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AppLayout from '@/components/Layout/AppLayout';
import PageTransition from '@/components/ui/PageTransition';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatModule = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your MindMate assistant. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response (in a real app, this would be an API call)
    setTimeout(() => {
      setIsTyping(false);
      
      // Demo responses based on user input
      let botResponse = "I understand. Can you tell me more about how you're feeling?";
      
      if (input.toLowerCase().includes('anxious') || input.toLowerCase().includes('anxiety')) {
        botResponse = "I'm sorry to hear you're feeling anxious. Try taking a few deep breaths. Would you like me to guide you through a quick breathing exercise?";
      } else if (input.toLowerCase().includes('sad') || input.toLowerCase().includes('depressed')) {
        botResponse = "I'm here for you. It's normal to feel down sometimes. Would you like to talk about what's contributing to these feelings?";
      } else if (input.toLowerCase().includes('happy') || input.toLowerCase().includes('good')) {
        botResponse = "I'm glad to hear you're doing well! What positive things have happened in your day so far?";
      } else if (input.toLowerCase().includes('stress') || input.toLowerCase().includes('stressed')) {
        botResponse = "Stress can be challenging. Let's think about what might help reduce your stress levels. Have you tried any relaxation techniques recently?";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AppLayout>
      <PageTransition>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col h-[calc(100vh-13rem)]">
            <div className="bg-gradient-to-r from-mindmate-100 to-mindmate-50 dark:from-mindmate-900/40 dark:to-mindmate-900/20 p-4 rounded-t-xl border-b">
              <h1 className="text-xl font-semibold">MindMate Chat Support</h1>
              <p className="text-sm text-muted-foreground">Talk to our AI assistant about how you're feeling</p>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-mindmate-100 text-mindmate-700">AI</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`space-y-1 ${message.sender === 'user' ? 'items-end' : ''}`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-mindmate-500 text-white' 
                          : 'bg-mindmate-50 dark:bg-mindmate-900/40 border border-white/20 dark:border-white/5'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground px-2">{formatTime(message.timestamp)}</p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-lilac-100 text-lilac-700">ME</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-mindmate-100 text-mindmate-700">AI</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="px-4 py-3 rounded-2xl bg-mindmate-50 dark:bg-mindmate-900/40 border border-white/20 dark:border-white/5">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-mindmate-400 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-mindmate-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-mindmate-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-b-xl">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="icon"
                  className="bg-mindmate-500 hover:bg-mindmate-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </AppLayout>
  );
};

export default ChatModule;
