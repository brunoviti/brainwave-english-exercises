
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PronunciationFeedback from "./pages/PronunciationFeedback";
import ArticulationExercises from "./pages/ArticulationExercises";
import ReadingExercises from "./pages/ReadingExercises";
import WritingExercises from "./pages/WritingExercises";
import PodcastExercises from "./pages/PodcastExercises";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pronunciation-feedback" element={<PronunciationFeedback />} />
          <Route path="/articulation" element={<ArticulationExercises />} />
          <Route path="/reading" element={<ReadingExercises />} />
          <Route path="/writing" element={<WritingExercises />} />
          <Route path="/podcast" element={<PodcastExercises />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
