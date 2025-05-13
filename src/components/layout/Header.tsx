
import { useState } from "react";
import { Bell, Search, User, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [notifications] = useState(3);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6">
      <div className="flex-1">
        <h1 className="text-base sm:text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden sm:block w-48 md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar..."
            className="w-full rounded-lg pl-8 shadow-none"
          />
        </div>

        <Toggle 
          pressed={theme === "dark"}
          onPressedChange={toggleTheme}
          size="sm"
          className="ml-auto"
          aria-label="Alternar tema"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Toggle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {notifications}
                </span>
              )}
              <span className="sr-only">Notificações</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Nova consulta agendada</p>
                <p className="text-xs text-muted-foreground">Há 5 minutos</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Laudo pronto para revisão</p>
                <p className="text-xs text-muted-foreground">Há 30 minutos</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Estoque baixo de produto #1234</p>
                <p className="text-xs text-muted-foreground">Há 2 horas</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm font-medium">
              Ver todas notificações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
