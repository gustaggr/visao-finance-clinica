
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import Finances from "./pages/Finances";
import Products from "./pages/Products";
import Appointments from "./pages/Appointments";
import Logs from "./pages/Logs";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Patients from "./pages/Patients";
import ViewReport from "./pages/ViewReport";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Route guard component
const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no specific roles are required or user role is allowed
  if (allowedRoles.length === 0 || allowedRoles.includes(user?.role)) {
    return element;
  }

  // Redirect to appropriate dashboard based on role
  return <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard routes based on role */}
            <Route path="/" element={
              <ProtectedRoute 
                element={<Index />} 
                allowedRoles={["doctor", "staff", "patient"]} 
              />
            } />

            {/* Doctor and Staff only routes */}
            <Route path="/reports" element={
              <ProtectedRoute 
                element={<Reports />} 
                allowedRoles={["doctor", "staff"]} 
              />
            } />
            <Route path="/finances" element={
              <ProtectedRoute 
                element={<Finances />} 
                allowedRoles={["doctor", "staff"]} 
              />
            } />
            <Route path="/products" element={
              <ProtectedRoute 
                element={<Products />} 
                allowedRoles={["doctor", "staff"]} 
              />
            } />
            <Route path="/appointments" element={
              <ProtectedRoute 
                element={<Appointments />} 
                allowedRoles={["doctor", "staff"]} 
              />
            } />
            <Route path="/logs" element={
              <ProtectedRoute 
                element={<Logs />} 
                allowedRoles={["doctor", "staff"]} 
              />
            } />
            <Route path="/patients" element={
              <ProtectedRoute 
                element={<Patients />} 
                allowedRoles={["doctor", "staff"]} 
              />
            } />
            <Route path="/settings" element={
              <ProtectedRoute 
                element={<Settings />} 
                allowedRoles={["doctor", "staff", "patient"]} 
              />
            } />
            
            {/* Patient specific route */}
            <Route path="/reports/:id" element={
              <ProtectedRoute 
                element={<ViewReport />} 
                allowedRoles={["doctor", "staff", "patient"]} 
              />
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
