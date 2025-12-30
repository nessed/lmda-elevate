import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Consultancy from "./pages/Consultancy";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import WorkshopUpload from "./pages/WorkshopUpload";
import WorkshopManage from "./pages/WorkshopManage";
import Calendar from "./pages/Calendar";
import Connect from "./pages/Connect";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LoadingScreen />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/consultancy" element={<Consultancy />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/super" element={<ProtectedRoute requireSuperAdmin><SuperAdminPanel /></ProtectedRoute>} />
              <Route path="/admin/upload" element={<ProtectedRoute requireContentMaker><WorkshopUpload /></ProtectedRoute>} />
              <Route path="/admin/workshops" element={<ProtectedRoute requireContentMaker><WorkshopManage /></ProtectedRoute>} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
