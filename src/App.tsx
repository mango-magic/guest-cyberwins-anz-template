import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Guest from "./components/guest";
import AnzGuests from "./components/anz/guest";
import ProfileLoader from "./pages/ProfileLoader";
import FaviconManager from "./components/FaviconManager";
import GeoRedirect from "./components/GeoRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FaviconManager />
        <Routes>
          {/* Geo-detect landing */}
          <Route path="/" element={<GeoRedirect />} />

          {/* Explicit region routes */}
          <Route path="/usa" element={<Guest />} />
          <Route path="/anz" element={<AnzGuests />} />

          {/* Admin */}
          <Route path="/admin" element={<Admin />} />

          {/* Profile pages under each region */}
          <Route path="/usa/:slug" element={<ProfileLoader />} />
          <Route path="/anz/:slug" element={<ProfileLoader />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;