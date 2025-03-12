
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// The key is a placeholder - see note below about API keys
const API_KEY = ""; 

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatModule = () => {
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(localStorage.getItem('mindmate_api_key') || '');
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

  useEffect(() => {
    // Save API key to localStorage if it exists
    if (apiKey) {
      localStorage.setItem('mindmate_api_key', apiKey);
    }
  }, [apiKey]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      if (!apiKey) {
        // If no API key, provide a simulated response
        setTimeout(() => {
          const botMessage: Message = { 
            role: 'assistant', 
            content: "I notice you haven't entered an OpenAI API key yet. I'm currently in demo mode, so my responses are pre-programmed. To enable the full AI experience, please enter your OpenAI API key in the field above the chat."
          };
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
        }, 1000);
        return;
      }
      
      // Real integration with OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
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
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const botMessage: Message = { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      };
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Error calling chat API:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please check your API key or try again later.",
        variant: "destructive"
      });
      
      // Add a fallback response
      const botMessage: Message = { 
        role: 'assistant', 
        content: "I'm having trouble connecting to my systems. This could be due to an invalid API key or network issues. Please try again later or check your API key."
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden bg-card">
      <div className="p-4 border-b bg-muted/30">
        <h2 className="text-xl font-semibold">MindMate Chat Support</h2>
        <p className="text-sm text-muted-foreground mb-2">Talk to our AI assistant about how you're feeling</p>
        
        <div className="flex gap-2 items-center">
          <Input
            type="password"
            placeholder="Enter OpenAI API Key (optional)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="text-xs"
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              if (apiKey) {
                toast({
                  title: "API Key Saved",
                  description: "Your API key has been saved locally in your browser."
                });
              }
            }}
          >
            Save Key
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Your API key is stored locally in your browser only. Without a key, the chat will operate in demo mode.
        </p>
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
