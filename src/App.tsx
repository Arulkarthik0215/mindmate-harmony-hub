
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import ChatSupport from "./pages/ChatSupport";
import MoodJournal from "./pages/MoodJournal";
import Resources from "./pages/Resources";
import FacialAnalysisModule from "./components/modules/FacialAnalysisModule";
import VoiceAnalysisModule from "./components/modules/VoiceAnalysisModule";
import ProfessionalSupport from "./pages/ProfessionalSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<ChatSupport />} />
          <Route path="/mood-journal" element={<MoodJournal />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/facial-analysis" element={<FacialAnalysisModule />} />
          <Route path="/voice-analysis" element={<VoiceAnalysisModule />} />
          <Route path="/professional" element={<ProfessionalSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
