
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// This is a placeholder for the OpenAI API
// In a real app, you would store this in a secure location
const API_KEY = "YOUR_OPENAI_API_KEY"; 

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatModule = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your MindMate assistant. How are you feeling today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // This is a demo integration with ChatGPT API
      // In production, this would be handled by a backend service
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a compassionate mental health assistant called MindMate. Provide supportive, empathetic responses. Never give harmful advice. Suggest professional help for serious concerns."
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: "user", content: input }
          ],
          max_tokens: 500
        })
      });
      
      // DEMO ONLY: Since we're not using a real API key, simulate a response
      // In a real app, you would parse the response
      setTimeout(() => {
        const botMessage: Message = { 
          role: 'assistant', 
          content: "I understand what you're going through. It's common to feel this way, and your feelings are valid. Would you like to talk more about what's happening? I'm here to listen and support you."
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error calling chat API:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden bg-card">
      <div className="p-4 border-b bg-muted/30">
        <h2 className="text-xl font-semibold">MindMate Chat Support</h2>
        <p className="text-sm text-muted-foreground">Talk to our AI assistant about how you're feeling</p>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground ml-12' 
                    : 'bg-muted mr-12'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted mr-12">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-background/50 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-grow"
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatModule;
