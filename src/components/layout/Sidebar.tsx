
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  BarChart3, 
  Package, 
  ClipboardList, 
  Calendar, 
  Users, 
  Settings,
  Menu, 
  Eye, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface NavItemProps {
  icon: React.ElementType;
  href: string;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, href, label, isCollapsed, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive
          ? "bg-vision text-white"
          : "text-sidebar-foreground hover:bg-vision-accent hover:text-vision"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

interface SidebarProps {
  closeMobileMenu?: () => void;
}

export default function Sidebar({ closeMobileMenu }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavItemClick = () => {
    if (closeMobileMenu) {
      closeMobileMenu();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar bg-sidebar-background text-sidebar-foreground transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center border-b px-3 py-4">
        <div className="flex items-center gap-2">
          <Eye className="h-6 w-6 text-vision" />
          {!isCollapsed && (
            <span className="text-lg font-semibold text-vision">VisionCare</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto lg:flex hidden"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2 px-3">
        <div className="space-y-1">
          {/* Patient can only access their reports */}
          {user.role === "patient" ? (
            <NavItem
              icon={FileText}
              href="/reports"
              label="Meus Exames"
              isCollapsed={isCollapsed}
              onClick={handleNavItemClick}
            />
          ) : (
            <>
              {/* Dashboard is accessible to doctors and staff only */}
              <NavItem
                icon={BarChart3}
                href="/"
                label="Dashboard"
                isCollapsed={isCollapsed}
                onClick={handleNavItemClick}
              />
              
              {/* Items available only for doctors and staff */}
              <NavItem
                icon={FileText}
                href="/reports"
                label="Exames / Laudos"
                isCollapsed={isCollapsed}
                onClick={handleNavItemClick}
              />
              <NavItem
                icon={Calendar}
                href="/appointments"
                label="Consultas"
                isCollapsed={isCollapsed}
                onClick={handleNavItemClick}
              />
              <NavItem
                icon={Users}
                href="/patients"
                label="Pacientes"
                isCollapsed={isCollapsed}
                onClick={handleNavItemClick}
              />
              <NavItem
                icon={Package}
                href="/products"
                label="Produtos"
                isCollapsed={isCollapsed}
                onClick={handleNavItemClick}
              />
              <NavItem
                icon={BarChart3}
                href="/finances"
                label="Financeiro"
                isCollapsed={isCollapsed}
                onClick={handleNavItemClick}
              />
              <NavItem
                icon={ClipboardList}
                href="/logs"
                label="Logs"
                isCollapsed={isCollapsed}
                onClick={handleNavItemClick}
              />
            </>
          )}

          {/* Settings accessible to all */}
          <NavItem
            icon={Settings}
            href="/settings"
            label="Configurações"
            isCollapsed={isCollapsed}
            onClick={handleNavItemClick}
          />
        </div>
      </div>
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-medium text-sidebar-foreground/70">Logado como</p>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70">
                {user.role === "doctor" && "Médico"}
                {user.role === "staff" && "Funcionário"}
                {user.role === "patient" && "Paciente"}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn("text-sidebar-foreground/70 hover:text-sidebar-foreground", 
                         isCollapsed ? "mx-auto" : "ml-auto")}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
