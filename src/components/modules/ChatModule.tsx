
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Demo responses for mental health support
const demoResponses = {
  greeting: [
    "Hello! I'm your MindMate assistant. How are you feeling today?",
    "Hi there! I'm here to support your mental wellbeing. How can I help you today?",
    "Welcome to MindMate! I'm here to chat about how you're feeling. What's on your mind?"
  ],
  anxiety: [
    "It sounds like you might be experiencing anxiety. Try some deep breathing exercises - breathe in for 4 counts, hold for 7, and exhale for 8. This can help calm your nervous system.",
    "Anxiety can feel overwhelming. Remember that these feelings are temporary. Consider grounding yourself by naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    "When anxiety hits, it might help to focus on the present moment. Try the 5-4-3-2-1 grounding technique or download a meditation app to guide you through mindfulness exercises."
  ],
  depression: [
    "I'm sorry you're feeling down. Depression can make everything feel more difficult. Try to be gentle with yourself and celebrate small accomplishments.",
    "When you're feeling depressed, it can help to establish a daily routine. Even small activities like taking a short walk or calling a friend can make a difference.",
    "Depression often lies to us about our worth and capabilities. Remember that your feelings, while valid, don't define your value or future possibilities."
  ],
  stress: [
    "Stress can be overwhelming. Try breaking down what's causing your stress into smaller, manageable parts. What's one small step you could take today?",
    "When stress builds up, our bodies need relief. Physical activity, even just stretching, can help release tension. Could you take a 5-minute break to move your body?",
    "Managing stress often requires setting boundaries. It's okay to say no to additional responsibilities when you're already feeling overwhelmed."
  ],
  sleep: [
    "Sleep troubles can significantly impact mental health. Try establishing a consistent sleep schedule and a relaxing bedtime routine without screens.",
    "For better sleep, consider limiting caffeine after noon and creating a cool, dark sleeping environment. White noise or gentle music might also help.",
    "If racing thoughts keep you awake, try jotting them down in a journal before bed. This can help clear your mind for sleep."
  ],
  selfCare: [
    "Self-care isn't selfish - it's necessary for wellbeing. What's one small thing you could do today just for you?",
    "Regular self-care helps build resilience. This could include physical activity, creative expression, time in nature, or connecting with supportive people.",
    "Sometimes self-care means setting boundaries or saying no to additional commitments. Prioritizing your wellbeing is important."
  ],
  professional: [
    "While I'm here to support you, some challenges benefit from professional help. Consider reaching out to a therapist or counselor who specializes in what you're experiencing.",
    "It sounds like you might benefit from speaking with a mental health professional. They can provide specialized support tailored to your specific needs.",
    "For ongoing support, connecting with a therapist could be valuable. Would you like to check out the Professional Support section to find qualified providers?"
  ],
  gratitude: [
    "Practicing gratitude can shift our perspective. What's something small you appreciate today?",
    "Even in difficult times, noting small positives can help. Perhaps the taste of your morning coffee or a kind text from a friend?",
    "Research shows gratitude practices can improve mental wellbeing. Consider keeping a gratitude journal to note 3 things you appreciate each day."
  ],
  default: [
    "I'm here to support you on your mental health journey. Could you tell me more about what you're experiencing?",
    "Thank you for sharing that with me. While I'm a demo assistant, I truly want to help. Would it help to explore coping strategies for what you're feeling?",
    "I appreciate you trusting me with your thoughts. Remember that seeking support is a sign of strength, not weakness."
  ]
};

// Helper function to find relevant responses based on keywords
const findRelevantResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (/\b(hi|hello|hey|greetings)\b/.test(lowerInput)) {
    return getRandomResponse('greeting');
  } else if (/\b(anxious|anxiety|panic|worry|worried|nervous|fear|afraid)\b/.test(lowerInput)) {
    return getRandomResponse('anxiety');
  } else if (/\b(sad|depress|depressed|depression|hopeless|unmotivated|down|blue)\b/.test(lowerInput)) {
    return getRandomResponse('depression');
  } else if (/\b(stress|stressed|overwhelm|overwhelmed|pressure|burnout)\b/.test(lowerInput)) {
    return getRandomResponse('stress');
  } else if (/\b(sleep|insomnia|tired|exhausted|rest|fatigue|bed)\b/.test(lowerInput)) {
    return getRandomResponse('sleep');
  } else if (/\b(self-care|selfcare|care|routine|healthy|practice)\b/.test(lowerInput)) {
    return getRandomResponse('selfCare');
  } else if (/\b(therapist|counselor|professional|doctor|psychiatrist|psychologist)\b/.test(lowerInput)) {
    return getRandomResponse('professional');
  } else if (/\b(grateful|gratitude|thankful|appreciate|appreciation|blessing)\b/.test(lowerInput)) {
    return getRandomResponse('gratitude');
  } else {
    return getRandomResponse('default');
  }
};

// Get random response from a category
const getRandomResponse = (category: keyof typeof demoResponses): string => {
  const responses = demoResponses[category];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

const ChatModule = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your MindMate assistant. How are you feeling today?"
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
    
    // Simulate assistant response with a short delay
    setTimeout(() => {
      const responseContent = findRelevantResponse(userMessage.content);
      const botMessage: Message = { 
        role: 'assistant', 
        content: responseContent
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden bg-card">
      <div className="p-4 border-b bg-muted/30">
        <h2 className="text-xl font-semibold">MindMate Chat Support</h2>
        <p className="text-sm text-muted-foreground mb-2">Talk to our AI assistant about how you're feeling</p>
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
