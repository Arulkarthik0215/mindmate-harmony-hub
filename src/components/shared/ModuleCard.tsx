
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color?: string;
  delay?: number;
  imageUrl?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  to,
  color = 'bg-mindmate-100 dark:bg-mindmate-900/40',
  delay = 0,
  imageUrl,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link 
        to={to}
        className={cn(
          "module-card h-full block rounded-2xl shadow-sm hover:shadow-md overflow-hidden",
          "border border-white/20 dark:border-white/5",
          "backdrop-blur-md transition-all duration-300",
          imageUrl ? "" : color
        )}
      >
        {imageUrl && (
          <div className="w-full h-32 relative">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        <div className={cn(
          "flex flex-col h-full p-6",
          imageUrl ? "-mt-16 relative z-10" : ""
        )}>
          <div className={cn(
            "mb-4",
            imageUrl ? "text-white dark:text-white" : "text-mindmate-500 dark:text-mindmate-300"
          )}>
            {icon}
          </div>
          <h3 className={cn(
            "text-xl font-semibold mb-2",
            imageUrl ? "text-white dark:text-white" : "text-foreground dark:text-foreground"
          )}>{title}</h3>
          <p className={cn(
            "text-sm flex-grow",
            imageUrl ? "text-white/90 dark:text-white/90" : "text-muted-foreground dark:text-muted-foreground"
          )}>{description}</p>
          <div className="mt-4 flex justify-end">
            <span className={cn(
              "text-xs font-medium flex items-center",
              imageUrl ? "text-white/90 dark:text-white/90" : "text-mindmate-600 dark:text-mindmate-300"
            )}>
              Open
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ModuleCard;
