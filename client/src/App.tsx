import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Info from "@/pages/Info";
import Schedule from "@/pages/Schedule";
import Prizes from "@/pages/Prizes";
import Venue from "@/pages/Venue";
import Hotel from "@/pages/Hotel";
import Policies from "@/pages/Policies";
import Sponsors from "@/pages/Sponsors";
import Players from "@/pages/Players";
import Pairings from "@/pages/Pairings";
import Contact from "@/pages/Contact";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";
import Flyer from "@/pages/Flyer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/info" component={Info} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/prizes" component={Prizes} />
      <Route path="/venue" component={Venue} />
      <Route path="/hotel" component={Hotel} />
      <Route path="/policies" component={Policies} />
      <Route path="/sponsors" component={Sponsors} />
      <Route path="/players" component={Players} />
      <Route path="/pairings" component={Pairings} />
      <Route path="/contact" component={Contact} />
      <Route path="/register" component={Register} />
      <Route path="/flyer" component={Flyer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
