
import { useState } from "react";
import { FileText, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const reports = [
  {
    id: "1",
    patient: "Maria Silva",
    exam: "Mapeamento de Retina",
    doctor: "Dr. Carlos Santos",
    date: "15/05/2025",
    status: "Pronto",
  },
  {
    id: "2",
    patient: "João Pereira",
    exam: "Tonometria",
    doctor: "Dra. Ana Oliveira",
    date: "14/05/2025",
    status: "Pronto",
  },
  {
    id: "3",
    patient: "Pedro Almeida",
    exam: "Topografia Corneana",
    doctor: "Dr. Carlos Santos",
    date: "13/05/2025",
    status: "Aguardando",
  },
  {
    id: "4",
    patient: "Lucia Ferreira",
    exam: "Campimetria",
    doctor: "Dra. Ana Oliveira",
    date: "12/05/2025",
    status: "Pronto",
  },
  {
    id: "5",
    patient: "Fernando Costa",
    exam: "Gonioscopia",
    doctor: "Dr. Carlos Santos",
    date: "11/05/2025", 
    status: "Aguardando",
  },
  {
    id: "6",
    patient: "Mariana Souza",
    exam: "OCT",
    doctor: "Dra. Ana Oliveira",
    date: "10/05/2025",
    status: "Em análise",
  },
  {
    id: "7",
    patient: "Roberto Lima",
    exam: "Paquimetria",
    doctor: "Dr. Carlos Santos",
    date: "09/05/2025",
    status: "Pronto",
  },
  {
    id: "8",
    patient: "Carla Rodrigues",
    exam: "Biomicroscopia",
    doctor: "Dra. Ana Oliveira",
    date: "08/05/2025",
    status: "Pronto",
  },
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredReports = reports.filter(
    (report) =>
      (report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.exam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === null || report.status === statusFilter)
  );

  return (
    <DashboardLayout title="Laudos de Exames">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Pesquisar por paciente, exame ou ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Pronto")}>
                Prontos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Aguardando")}>
                Aguardando
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Em análise")}>
                Em análise
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-vision" />
              Laudos de Exames
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Exame</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.patient}</TableCell>
                    <TableCell>{report.exam}</TableCell>
                    <TableCell>{report.doctor}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          report.status === "Pronto"
                            ? "bg-green-50 text-green-700"
                            : report.status === "Aguardando"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/reports/${report.id}`}>Visualizar</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-slate-500"
                    >
                      Nenhum laudo encontrado com os filtros atuais.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
