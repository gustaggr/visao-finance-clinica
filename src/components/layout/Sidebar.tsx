
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

interface NavItemProps {
  icon: React.ElementType;
  href: string;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ icon: Icon, href, label, isCollapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive
          ? "bg-vision text-white"
          : "text-slate-600 hover:bg-vision-accent hover:text-vision"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-slate-50 transition-all duration-300",
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
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2 px-3">
        <div className="space-y-1">
          <NavItem
            icon={BarChart3}
            href="/"
            label="Dashboard"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={FileText}
            href="/reports"
            label="Exames / Laudos"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={Calendar}
            href="/appointments"
            label="Consultas"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={Users}
            href="/patients"
            label="Pacientes"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={Package}
            href="/products"
            label="Produtos"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={BarChart3}
            href="/finances"
            label="Financeiro"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={ClipboardList}
            href="/logs"
            label="Logs"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={Settings}
            href="/settings"
            label="Configurações"
            isCollapsed={isCollapsed}
          />
        </div>
      </div>
      <div className="border-t p-3">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-medium text-slate-500">Logado como</p>
              <p className="text-sm font-medium">Dr. Carlos Silva</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-slate-500 hover:text-slate-900"
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
