
import React from 'react';
import PageTransition from '@/components/ui/PageTransition';
import ChatModule from '@/components/modules/ChatModule';
import AppLayout from '@/components/Layout/AppLayout';

const ChatSupport = () => {
  return (
    <AppLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Chat Support</h1>
            <p className="text-muted-foreground">
              Talk to our AI assistant about your thoughts and feelings
            </p>
          </div>
          
          <div className="h-[70vh]">
            <ChatModule />
          </div>
        </div>
      </PageTransition>
    </AppLayout>
  );
};

export default ChatSupport;
