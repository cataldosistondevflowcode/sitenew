import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import WebflowHome from "./pages/WebflowHome";
import WebflowPropertyDetail from "./pages/WebflowPropertyDetail";
import WebflowAssessoria from "./pages/WebflowAssessoria";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

const App = () => {
  // Base path para produção (Netlify)
  const basename = import.meta.env.PROD ? '/sitenew' : '/';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<WebflowHome />} />
            <Route path="/webflow" element={<WebflowHome />} />
            <Route path="/webflow/:collectionId/:slug" element={<WebflowPropertyDetail />} />
            <Route path="/assessoria" element={<WebflowAssessoria />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
