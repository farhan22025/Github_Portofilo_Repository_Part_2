import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { Navbar } from "@/components/Navbar";
import { Chatbot } from "@/components/Chatbot";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Add base path logic for GitHub pages support if needed, or replit deployments
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={basePath}>
          <div className="min-h-screen flex flex-col font-sans">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
            <Chatbot />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
