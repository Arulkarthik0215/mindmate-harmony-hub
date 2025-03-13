
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Phone, User, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/Layout/AppLayout';
import PageTransition from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/button';

// Define psychiatrist data
interface Psychiatrist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  availability: string;
  imageUrl: string;
  email: string;
  phone: string;
}

const psychiatrists: Psychiatrist[] = [
  {
    id: 'p1',
    name: 'Dr. Sarah Johnson',
    title: 'MD, Psychiatrist',
    specialties: ['Depression', 'Anxiety', 'PTSD'],
    availability: 'Mon, Wed, Fri: 9 AM - 5 PM',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    email: 'sarah.johnson@mindmate.example',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 'p2',
    name: 'Dr. Michael Chen',
    title: 'MD, Psychiatrist',
    specialties: ['Bipolar Disorder', 'OCD', 'Schizophrenia'],
    availability: 'Tue, Thu: 10 AM - 6 PM, Sat: 9 AM - 1 PM',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    email: 'michael.chen@mindmate.example',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 'p3',
    name: 'Dr. Emily Rodriguez',
    title: 'PhD, Clinical Psychologist',
    specialties: ['Trauma', 'Grief Counseling', 'Eating Disorders'],
    availability: 'Mon, Tue, Thu, Fri: 12 PM - 8 PM',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    email: 'emily.rodriguez@mindmate.example',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 'p4',
    name: 'Dr. James Wilson',
    title: 'MD, Psychiatrist',
    specialties: ['Addiction', 'Depression', 'Anxiety'],
    availability: 'Wed, Fri: 9 AM - 7 PM, Sat: 10 AM - 3 PM',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300',
    email: 'james.wilson@mindmate.example',
    phone: '+1 (555) 456-7890',
  }
];

const ProfessionalSupport = () => {
  return (
    <AppLayout>
      <PageTransition>
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 mb-10"
          >
            <h1 className="text-3xl font-bold tracking-tight">Professional Support</h1>
            <p className="text-muted-foreground max-w-3xl">
              Connect with licensed therapists and psychiatrists for professional mental health support. 
              Our network of experts is available for virtual consultations to provide personalized care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {psychiatrists.map((psychiatrist, index) => (
              <motion.div 
                key={psychiatrist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start space-x-4">
                  <img 
                    src={psychiatrist.imageUrl} 
                    alt={psychiatrist.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{psychiatrist.name}</h2>
                    <p className="text-muted-foreground text-sm">{psychiatrist.title}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {psychiatrist.specialties.map(specialty => (
                        <span 
                          key={specialty} 
                          className="px-2 py-1 bg-mindmate-100 dark:bg-mindmate-900/40 text-mindmate-800 dark:text-mindmate-200 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4 text-mindmate-500" />
                    <span>{psychiatrist.availability}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4 text-mindmate-500" />
                    <span>{psychiatrist.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4 text-mindmate-500" />
                    <span>{psychiatrist.phone}</span>
                  </div>
                </div>
                
                <div className="mt-5 flex gap-2">
                  <Button variant="outline" className="w-1/2">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button className="w-1/2 bg-mindmate-500 hover:bg-mindmate-600">
                    <Video className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 p-6 glass-card bg-gradient-to-r from-mindmate-100/80 to-lilac-100/80 dark:from-mindmate-900/30 dark:to-lilac-900/30"
          >
            <h3 className="text-xl font-semibold mb-2">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-2">
              <li>Select a psychiatrist that matches your needs</li>
              <li>Schedule a virtual consultation at your preferred time</li>
              <li>Connect via secure video call for your session</li>
              <li>Receive personalized treatment and follow-up care</li>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              All consultations are confidential and conducted through our secure platform. Insurance coverage may vary.
            </p>
          </motion.div>
        </div>
      </PageTransition>
    </AppLayout>
  );
};

export default ProfessionalSupport;
