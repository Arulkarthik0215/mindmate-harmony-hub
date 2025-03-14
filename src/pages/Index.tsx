
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Smile, Mic, Book, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
              Welcome to <span className="text-primary">MindMate</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your companion for mental wellness, providing tools and support for your journey to better mental health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/auth/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/auth/register">Create Account</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { 
                  title: "Chat Support", 
                  icon: <MessageSquare size={24} />, 
                  color: "bg-mindmate-100 dark:bg-mindmate-900/30" 
                },
                { 
                  title: "Facial Analysis", 
                  icon: <Smile size={24} />, 
                  color: "bg-lilac-100 dark:bg-lilac-900/30" 
                },
                { 
                  title: "Voice Analysis", 
                  icon: <Mic size={24} />, 
                  color: "bg-lilac-100 dark:bg-lilac-900/30" 
                },
                { 
                  title: "Mood Journal", 
                  icon: <Brain size={24} />, 
                  color: "bg-mindmate-100 dark:bg-mindmate-900/30" 
                },
                { 
                  title: "Resources", 
                  icon: <Book size={24} />, 
                  color: "bg-mindmate-100 dark:bg-mindmate-900/30" 
                },
                { 
                  title: "Professional Help", 
                  icon: <Users size={24} />, 
                  color: "bg-lilac-100 dark:bg-lilac-900/30" 
                }
              ].map((module, index) => (
                <div 
                  key={index}
                  className={`rounded-xl ${module.color} p-4 text-center hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center`}
                >
                  <div className="mb-2 text-mindmate-500 dark:text-mindmate-300">
                    {module.icon}
                  </div>
                  <h3 className="text-sm font-medium">{module.title}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">How MindMate Helps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-xl shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-mindmate-100 dark:bg-mindmate-900/30 rounded-full text-2xl">
                <Brain size={24} className="text-mindmate-500 dark:text-mindmate-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Mental Health</h3>
              <p className="text-muted-foreground">Monitor your mood, identify patterns, and gain insights into your mental wellbeing.</p>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-lilac-100 dark:bg-lilac-900/30 rounded-full text-2xl">
                <MessageSquare size={24} className="text-lilac-500 dark:text-lilac-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Support</h3>
              <p className="text-muted-foreground">Connect with our AI chatbot for immediate support or find professional help when needed.</p>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-mindmate-100 dark:bg-mindmate-900/30 rounded-full text-2xl">
                <Smile size={24} className="text-mindmate-500 dark:text-mindmate-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Improve Over Time</h3>
              <p className="text-muted-foreground">Access resources, tools and strategies to build resilience and improve your mental health.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
