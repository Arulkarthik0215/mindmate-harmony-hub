
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
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  to,
  color = 'bg-mindmate-100 dark:bg-mindmate-900/40',
  delay = 0,
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
          "module-card h-full block p-6 rounded-2xl shadow-sm hover:shadow-md",
          "border border-white/20 dark:border-white/5",
          "backdrop-blur-md transition-all duration-300",
          color
        )}
      >
        <div className="flex flex-col h-full">
          <div className="mb-4 text-mindmate-500 dark:text-mindmate-300">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground flex-grow">{description}</p>
          <div className="mt-4 flex justify-end">
            <span className="text-xs font-medium text-mindmate-600 dark:text-mindmate-300 flex items-center">
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
