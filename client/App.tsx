import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import LanguageTuition from "./pages/LanguageTuition";
import SchoolTuition from "./pages/SchoolTuition";
import GroupClasses from "./pages/GroupClasses";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import FindTutor from "./pages/FindTutor";
import TutorProfile from "./pages/TutorProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/language-tuition" element={<LanguageTuition />} />
            <Route path="/school-tuition" element={<SchoolTuition />} />
            <Route path="/group-classes" element={<GroupClasses />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/find-tutor" element={<FindTutor />} />
            <Route path="/tutor/:id" element={<TutorProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
