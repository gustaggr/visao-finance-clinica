
import { useState } from "react";
import { Search, Filter, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const logs = [
  {
    id: "L001",
    timestamp: new Date("2025-05-15T09:15:23"),
    user: "Dr. Carlos Santos",
    action: "Login no sistema",
    module: "Autenticação",
    status: "success",
  },
  {
    id: "L002",
    timestamp: new Date("2025-05-15T09:25:47"),
    user: "Dr. Carlos Santos",
    action: "Criação de paciente",
    module: "Pacientes",
    status: "success",
  },
  {
    id: "L003",
    timestamp: new Date("2025-05-15T10:05:12"),
    user: "Dra. Ana Oliveira",
    action: "Login no sistema",
    module: "Autenticação",
    status: "success",
  },
  {
    id: "L004",
    timestamp: new Date("2025-05-15T10:17:35"),
    user: "Dr. Carlos Santos",
    action: "Agendamento de consulta",
    module: "Consultas",
    status: "success",
  },
  {
    id: "L005",
    timestamp: new Date("2025-05-15T10:43:28"),
    user: "Secretária Maria",
    action: "Tentativa de acesso não autorizado",
    module: "Financeiro",
    status: "error",
  },
  {
    id: "L006",
    timestamp: new Date("2025-05-15T11:02:56"),
    user: "Dra. Ana Oliveira",
    action: "Atualização de produto",
    module: "Produtos",
    status: "warning",
  },
  {
    id: "L007",
    timestamp: new Date("2025-05-15T11:27:19"),
    user: "Sistema",
    action: "Backup automático",
    module: "Sistema",
    status: "success",
  },
  {
    id: "L008",
    timestamp: new Date("2025-05-15T12:14:05"),
    user: "Dr. Carlos Santos",
    action: "Geração de laudo",
    module: "Laudos",
    status: "success",
  },
  {
    id: "L009",
    timestamp: new Date("2025-05-15T14:36:41"),
    user: "Sistema",
    action: "Erro na sincronização",
    module: "Sistema",
    status: "error",
  },
  {
    id: "L010",
    timestamp: new Date("2025-05-15T15:22:08"),
    user: "Dra. Ana Oliveira",
    action: "Finalização de consulta",
    module: "Consultas",
    status: "success",
  },
  {
    id: "L011",
    timestamp: new Date("2025-05-15T16:09:37"),
    user: "Secretária Maria",
    action: "Recebimento de pagamento",
    module: "Financeiro",
    status: "success",
  },
  {
    id: "L012",
    timestamp: new Date("2025-05-15T16:45:14"),
    user: "Dr. Carlos Santos",
    action: "Logout",
    module: "Autenticação",
    status: "success",
  },
];

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredLogs = logs.filter(
    (log) => {
      const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             log.module.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesModule = moduleFilter ? log.module === moduleFilter : true;
      const matchesStatus = statusFilter ? log.status === statusFilter : true;
      
      return matchesSearch && matchesModule && matchesStatus;
    }
  );

  // Get unique modules and statuses for the filters
  const uniqueModules = [...new Set(logs.map(log => log.module))];
  const uniqueStatuses = [...new Set(logs.map(log => log.status))];

  return (
    <DashboardLayout title="Logs do Sistema">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Pesquisar logs..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select onValueChange={(value) => setModuleFilter(value === "all" ? null : value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Módulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {uniqueModules.map((module) => (
                  <SelectItem key={module} value={module}>
                    {module}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {uniqueStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "success" ? "Sucesso" : status === "error" ? "Erro" : "Aviso"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-vision" />
                Logs do Sistema
              </CardTitle>
              <Button variant="outline" size="sm" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span>Mais filtros</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Módulo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">{log.id}</TableCell>
                    <TableCell>
                      {format(log.timestamp, "dd/MM/yyyy HH:mm:ss")}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                        {log.module}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        {log.status === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : log.status === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={
                            log.status === "success"
                              ? "text-green-600"
                              : log.status === "warning"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                        >
                          {log.status === "success"
                            ? "Sucesso"
                            : log.status === "warning"
                            ? "Aviso"
                            : "Erro"}
                        </span>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredLogs.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-slate-500"
                    >
                      Nenhum log encontrado com os filtros atuais.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button variant="outline">Carregar mais logs</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
