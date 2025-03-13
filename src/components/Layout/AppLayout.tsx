
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, LogOut, Menu, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // In a real app, implement actual logout logic
    navigate('/');
  };

  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2023",
    assessmentsTaken: 12,
    lastLogin: "Today at 9:30 AM"
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mindmate-400 to-lilac-500 flex items-center justify-center text-white font-semibold">
                M
              </div>
              <span className="font-semibold text-xl hidden sm:inline-block">MindMate</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">3</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback className="text-xl">JD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Member since</p>
                <p className="font-medium">{userData.joinDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Assessments taken</p>
                <p className="font-medium">{userData.assessmentsTaken}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Last login</p>
                <p className="font-medium">{userData.lastLogin}</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Your personal information is kept private and secure.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar - Mobile */}
        <motion.div
          className={`lg:hidden fixed inset-y-0 left-0 z-30 w-64 bg-background border-r pt-16 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          initial={false}
          animate={{ x: isSidebarOpen ? 0 : '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <nav className="space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                  location.pathname === item.path
                    ? 'bg-mindmate-50 text-mindmate-700 dark:bg-mindmate-900/50 dark:text-mindmate-300'
                    : 'text-gray-700 hover:bg-mindmate-50 dark:text-gray-300 dark:hover:bg-mindmate-900/30'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
        
        {/* Sidebar - Desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow overflow-y-auto pt-5 border-r bg-background">
              <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      location.pathname === item.path
                        ? 'bg-mindmate-50 text-mindmate-700 dark:bg-mindmate-900/50 dark:text-mindmate-300'
                        : 'text-gray-700 hover:bg-mindmate-50 dark:text-gray-300 dark:hover:bg-mindmate-900/30'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
              onClick={toggleSidebar}
            />
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
