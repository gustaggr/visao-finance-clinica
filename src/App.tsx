
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import Finances from "./pages/Finances";
import FinanceTransactions from "./pages/FinanceTransactions";
import Products from "./pages/Products";
import Appointments from "./pages/Appointments";
import Logs from "./pages/Logs";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Patients from "./pages/Patients";
import ViewReport from "./pages/ViewReport";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

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

  // Redirect patients to their reports page
  if (user?.role === "patient") {
    return <Navigate to="/reports" replace />;
  }

  // Redirect other roles to dashboard
  return <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<Login />} />
              
              {/* Dashboard route - only for doctor and staff */}
              <Route path="/" element={
                <ProtectedRoute 
                  element={<Index />} 
                  allowedRoles={["doctor", "staff"]} 
                />
              } />

              {/* Reports accessible by all, but patients will only see their own */}
              <Route path="/reports" element={
                <ProtectedRoute 
                  element={<Reports />} 
                  allowedRoles={["doctor", "staff", "patient"]} 
                />
              } />
              
              {/* Detailed report view accessible by all */}
              <Route path="/reports/:id" element={
                <ProtectedRoute 
                  element={<ViewReport />} 
                  allowedRoles={["doctor", "staff", "patient"]} 
                />
              } />

              {/* Doctor and Staff only routes */}
              <Route path="/finances" element={
                <ProtectedRoute 
                  element={<Finances />} 
                  allowedRoles={["doctor", "staff"]} 
                />
              } />
              <Route path="/finances/transactions" element={
                <ProtectedRoute 
                  element={<FinanceTransactions />} 
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
              
              {/* Settings accessible to all */}
              <Route path="/settings" element={
                <ProtectedRoute 
                  element={<Settings />} 
                  allowedRoles={["doctor", "staff", "patient"]} 
                />
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
