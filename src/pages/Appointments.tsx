
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Search, Plus, User, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const initialAppointments = [
  {
    id: "A001",
    patient: "Maria Silva",
    doctor: "Dr. Carlos Santos",
    date: new Date("2025-05-15T09:00:00"),
    type: "Consulta",
    status: "Confirmada",
  },
  {
    id: "A002",
    patient: "João Pereira",
    doctor: "Dra. Ana Oliveira",
    date: new Date("2025-05-15T10:30:00"),
    type: "Retorno",
    status: "Confirmada",
  },
  {
    id: "A003",
    patient: "Pedro Almeida",
    doctor: "Dr. Carlos Santos",
    date: new Date("2025-05-15T11:45:00"),
    type: "Exame",
    status: "Pendente",
  },
  {
    id: "A004",
    patient: "Lucia Ferreira",
    doctor: "Dra. Ana Oliveira",
    date: new Date("2025-05-15T14:15:00"),
    type: "Consulta",
    status: "Confirmada",
  },
  {
    id: "A005",
    patient: "Fernando Costa",
    doctor: "Dr. Carlos Santos",
    date: new Date("2025-05-16T09:30:00"),
    type: "Retorno",
    status: "Confirmada",
  },
  {
    id: "A006",
    patient: "Mariana Souza",
    doctor: "Dra. Ana Oliveira",
    date: new Date("2025-05-16T11:00:00"),
    type: "Exame",
    status: "Pendente",
  },
  {
    id: "A007",
    patient: "Roberto Lima",
    doctor: "Dr. Carlos Santos",
    date: new Date("2025-05-16T14:45:00"),
    type: "Consulta",
    status: "Cancelada",
  },
  {
    id: "A008",
    patient: "Carla Rodrigues",
    doctor: "Dra. Ana Oliveira",
    date: new Date("2025-05-17T10:15:00"),
    type: "Retorno",
    status: "Confirmada",
  },
];

export default function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date("2025-05-15"));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    doctor: "",
    date: new Date(),
    time: "",
    type: "",
    status: "Pendente",
  });

  const formattedDate = selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "";

  const filteredAppointments = appointments.filter(
    (appointment) => {
      const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appointment.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDate = selectedDate ? 
                         appointment.date.toDateString() === selectedDate.toDateString() : 
                         true;
      
      return matchesSearch && matchesDate;
    }
  );

  const handleAddAppointment = () => {
    const [hours, minutes] = newAppointment.time.split(":").map(Number);
    const appointmentDate = new Date(newAppointment.date);
    appointmentDate.setHours(hours, minutes, 0);

    const newId = `A${String(appointments.length + 1).padStart(3, '0')}`;
    
    setAppointments([...appointments, {
      id: newId,
      patient: newAppointment.patient,
      doctor: newAppointment.doctor,
      date: appointmentDate,
      type: newAppointment.type,
      status: newAppointment.status,
    }]);
    
    setIsAddDialogOpen(false);
    setNewAppointment({
      patient: "",
      doctor: "",
      date: new Date(),
      time: "",
      type: "",
      status: "Pendente",
    });
  };

  const handleNextDay = () => {
    if (selectedDate) {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setSelectedDate(nextDay);
    }
  };

  const handlePrevDay = () => {
    if (selectedDate) {
      const prevDay = new Date(selectedDate);
      prevDay.setDate(prevDay.getDate() - 1);
      setSelectedDate(prevDay);
    }
  };

  // Group appointments by hour for the daily view
  const appointmentsByHour: { [key: string]: typeof initialAppointments } = {};
  
  filteredAppointments.forEach((appointment) => {
    const hour = format(appointment.date, "HH:mm");
    if (!appointmentsByHour[hour]) {
      appointmentsByHour[hour] = [];
    }
    appointmentsByHour[hour].push(appointment);
  });

  // Sort hours
  const sortedHours = Object.keys(appointmentsByHour).sort();

  return (
    <DashboardLayout title="Consultas">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar consulta..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecionar data"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            onClick={() => {
              setNewAppointment({
                ...newAppointment,
                date: selectedDate || new Date(),
              });
              setIsAddDialogOpen(true);
            }}
            className="flex gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Consulta</span>
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevDay}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </Button>
          <h2 className="text-lg font-medium">{formattedDate}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextDay}
            className="flex items-center gap-1"
          >
            <span>Próximo</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-vision" />
              Agenda de Consultas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-10 text-slate-500">
                Nenhuma consulta agendada para esta data.
              </div>
            ) : (
              <div className="space-y-4">
                {sortedHours.map((hour) => (
                  <div key={hour} className="border-l-4 border-vision pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-vision" />
                      <span className="font-medium">{hour}</span>
                    </div>
                    <div className="space-y-2">
                      {appointmentsByHour[hour].map((appointment) => (
                        <Card key={appointment.id} className="bg-white shadow-sm">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-slate-500" />
                                  <span className="font-medium">{appointment.patient}</span>
                                </div>
                                <div className="text-sm text-slate-500 mt-1">
                                  {appointment.doctor} - {appointment.type}
                                </div>
                              </div>
                              <Badge 
                                variant="outline"
                                className={cn(
                                  appointment.status === "Confirmada" && "bg-green-50 text-green-700 border-green-200",
                                  appointment.status === "Pendente" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                                  appointment.status === "Cancelada" && "bg-red-50 text-red-700 border-red-200"
                                )}
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-vision" />
              Lista de Consultas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.id}</TableCell>
                    <TableCell>{appointment.patient}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>
                      {format(appointment.date, "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          appointment.status === "Confirmada"
                            ? "bg-green-50 text-green-700"
                            : appointment.status === "Pendente"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAppointments.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-slate-500"
                    >
                      Nenhuma consulta encontrada com os filtros atuais.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agendar Nova Consulta</DialogTitle>
            <DialogDescription>
              Preencha os detalhes para agendar uma nova consulta.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Paciente</Label>
              <Input
                id="patient"
                value={newAppointment.patient}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, patient: e.target.value })
                }
                placeholder="Nome do paciente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Médico</Label>
              <select
                id="doctor"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newAppointment.doctor}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, doctor: e.target.value })
                }
              >
                <option value="">Selecione um médico</option>
                <option value="Dr. Carlos Santos">Dr. Carlos Santos</option>
                <option value="Dra. Ana Oliveira">Dra. Ana Oliveira</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newAppointment.date
                        ? format(newAppointment.date, "dd/MM/yyyy")
                        : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newAppointment.date}
                      onSelect={(date) => setNewAppointment({ ...newAppointment, date: date || new Date() })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, time: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newAppointment.type}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, type: e.target.value })
                }
              >
                <option value="">Selecione um tipo</option>
                <option value="Consulta">Consulta</option>
                <option value="Retorno">Retorno</option>
                <option value="Exame">Exame</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newAppointment.status}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    status: e.target.value,
                  })
                }
              >
                <option value="Pendente">Pendente</option>
                <option value="Confirmada">Confirmada</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddAppointment}>Agendar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
