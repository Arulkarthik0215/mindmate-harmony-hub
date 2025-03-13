
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, BookText, Download, ExternalLink, FileText, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/Layout/AppLayout';
import PageTransition from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/button';

// Define resource types
interface Resource {
  id: string;
  title: string;
  description: string;
  source: string;
  link: string;
  type: 'book' | 'video';
  imageUrl: string;
}

// List of freely available mental health resources
const resources: Resource[] = [
  {
    id: 'book-1',
    title: 'Feeling Good: The New Mood Therapy',
    description: 'By David D. Burns - A scientifically proven, drug-free treatment for depression.',
    source: 'Public Domain',
    link: '/resources/feeling-good.pdf',
    type: 'book',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'book-2',
    title: 'Mind Over Mood',
    description: 'By Dennis Greenberger & Christine Padesky - Change how you feel by changing how you think.',
    source: 'Free Edition',
    link: '/resources/mind-over-mood.pdf',
    type: 'book',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'book-3',
    title: 'The Anxiety and Worry Workbook',
    description: 'By David A. Clark & Aaron T. Beck - Cognitive behavioral therapy approach to anxiety.',
    source: 'Open Access',
    link: '/resources/anxiety-workbook.pdf',
    type: 'book',
    imageUrl: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'video-1',
    title: 'Overcoming Depression',
    description: 'A comprehensive guide to understanding and managing depression symptoms.',
    source: 'YouTube',
    link: 'https://www.youtube.com/watch?v=TVgQ_tgWMyU',
    type: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'video-2',
    title: 'Meditation for Anxiety',
    description: '15-minute guided meditation practice for anxiety relief.',
    source: 'YouTube',
    link: 'https://www.youtube.com/watch?v=O-6f5wQXSu8',
    type: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'video-3',
    title: 'Understanding Cognitive Behavioral Therapy',
    description: 'Learn the basics of CBT and how it can help improve mental health.',
    source: 'YouTube',
    link: 'https://www.youtube.com/watch?v=8bnP5GvUL_U',
    type: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1536746803623-cef87080bfc8?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    id: 'video-4',
    title: 'Managing Stress in Everyday Life',
    description: 'Practical techniques for managing daily stress and preventing burnout.',
    source: 'YouTube',
    link: 'https://www.youtube.com/watch?v=hnpQrMqDoqE',
    type: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1513682121497-80211f36a7d3?auto=format&fit=crop&q=80&w=800&h=500'
  }
];

const Resources = () => {
  const [activeType, setActiveType] = React.useState<'all' | 'book' | 'video'>('all');

  const filteredResources = activeType === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === activeType);

  return (
    <AppLayout>
      <PageTransition>
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <div>
              <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Mental Health Resources</h1>
              <p className="text-muted-foreground max-w-3xl">
                Access free books, guides, and videos to support your mental health journey. These resources are curated to help you learn effective strategies for managing stress, anxiety, and depression.
              </p>
            </div>

            <div className="flex space-x-2 mb-8">
              <Button 
                variant={activeType === 'all' ? 'default' : 'outline'} 
                onClick={() => setActiveType('all')}
              >
                All Resources
              </Button>
              <Button 
                variant={activeType === 'book' ? 'default' : 'outline'} 
                onClick={() => setActiveType('book')}
                className="flex items-center gap-2"
              >
                <BookText className="h-4 w-4" />
                Books & PDFs
              </Button>
              <Button 
                variant={activeType === 'video' ? 'default' : 'outline'} 
                onClick={() => setActiveType('video')}
                className="flex items-center gap-2"
              >
                <Video className="h-4 w-4" />
                Videos
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg overflow-hidden bg-card"
                >
                  <div className="aspect-video relative">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {resource.source}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {resource.type === 'book' ? (
                        <BookOpen className="h-5 w-5 text-primary mr-2" />
                      ) : (
                        <Video className="h-5 w-5 text-primary mr-2" />
                      )}
                      <h3 className="text-lg font-semibold">{resource.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm">{resource.description}</p>
                    
                    <div className="mt-auto">
                      {resource.type === 'book' ? (
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => window.open(resource.link, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                          Download PDF
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => window.open(resource.link, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Watch Video
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </AppLayout>
  );
};

export default Resources;
