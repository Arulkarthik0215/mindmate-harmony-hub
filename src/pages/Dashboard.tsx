
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageCircle, Mic, User, BookOpen, VideoIcon } from 'lucide-react';

import AppLayout from '@/components/Layout/AppLayout';
import ModuleCard from '@/components/shared/ModuleCard';
import PageTransition from '@/components/ui/PageTransition';

const Dashboard = () => {
  const modules = [
    {
      title: 'Chatbot Support',
      description: 'Talk to our AI assistant for real-time mental health support',
      icon: <MessageCircle className="w-8 h-8" />,
      to: '/chatbot',
      color: 'bg-mindmate-50/80 dark:bg-mindmate-900/30',
      delay: 1
    },
    {
      title: 'Facial Analysis',
      description: 'Analyze your mood through facial expressions',
      icon: <User className="w-8 h-8" />,
      to: '/facial-analysis',
      color: 'bg-lilac-50/80 dark:bg-lilac-900/30',
      delay: 2
    },
    {
      title: 'Voice Analysis',
      description: 'Detect your mental state through voice patterns',
      icon: <Mic className="w-8 h-8" />,
      to: '/voice-analysis',
      color: 'bg-mindmate-50/80 dark:bg-mindmate-900/30',
      delay: 3
    },
    {
      title: 'Mood Journal',
      description: 'Track your mood and emotions with standardized assessments',
      icon: <Brain className="w-8 h-8" />,
      to: '/mood-journal',
      color: 'bg-lilac-50/80 dark:bg-lilac-900/30',
      delay: 4
    },
    {
      title: 'Resources',
      description: 'Access helpful books, videos and materials',
      icon: <BookOpen className="w-8 h-8" />,
      to: '/resources',
      color: 'bg-mindmate-50/80 dark:bg-mindmate-900/30',
      delay: 5
    },
    {
      title: 'Professional Support',
      description: 'Connect with licensed therapists and psychiatrists',
      icon: <VideoIcon className="w-8 h-8" />,
      to: '/professional',
      color: 'bg-lilac-50/80 dark:bg-lilac-900/30',
      delay: 6
    }
  ];

  return (
    <AppLayout>
      <PageTransition>
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold tracking-tight">Welcome to MindMate</h1>
            <p className="text-muted-foreground max-w-3xl">
              Your personal mental health companion. Choose from the modules below to get started on your mental wellness journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <ModuleCard
                key={index}
                title={module.title}
                description={module.description}
                icon={module.icon}
                to={module.to}
                color={module.color}
                delay={module.delay}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gradient-to-r from-mindmate-100/80 to-lilac-100/80 dark:from-mindmate-900/30 dark:to-lilac-900/30 p-6 rounded-2xl border border-white/20 dark:border-white/5 backdrop-blur-md"
          >
            <h3 className="text-xl font-semibold mb-2">Your Mental Health Journey</h3>
            <p className="text-muted-foreground">
              MindMate provides personalized assistance based on your interactions and mood tracking data. 
              The more you use the platform, the more tailored your experience will become.
            </p>
          </motion.div>
        </div>
      </PageTransition>
    </AppLayout>
  );
};

export default Dashboard;
