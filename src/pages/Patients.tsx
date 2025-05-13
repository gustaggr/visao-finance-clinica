
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, Search, User } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data for patients
const mockPatients = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 98765-4321",
    birthdate: new Date("1985-03-15"),
    lastVisit: new Date("2023-10-05"),
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria@email.com",
    phone: "(11) 91234-5678",
    birthdate: new Date("1990-07-22"),
    lastVisit: new Date("2023-11-12"),
  },
  {
    id: "3",
    name: "Pedro Santos",
    email: "pedro@email.com",
    phone: "(11) 99876-5432",
    birthdate: new Date("1978-11-30"),
    lastVisit: new Date("2023-09-18"),
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@email.com",
    phone: "(11) 95555-4444",
    birthdate: new Date("1995-05-10"),
    lastVisit: new Date("2023-12-01"),
  },
  {
    id: "5",
    name: "Lucas Mendes",
    email: "lucas@email.com",
    phone: "(11) 94444-3333",
    birthdate: new Date("1982-09-05"),
    lastVisit: new Date("2023-08-25"),
  },
];

interface PatientFormValues {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
}

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<PatientFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthdate: "",
    },
  });

  const handleSubmit = (data: PatientFormValues) => {
    console.log("Novo paciente:", data);
    setIsDialogOpen(false);
    form.reset();
  };

  // Filter patients based on search query
  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
  );

  return (
    <DashboardLayout title="Pacientes">
      <div className="space-y-6">
        <div className="flex justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar paciente por nome, email ou telefone..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-vision hover:bg-vision-dark">
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Paciente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Paciente</DialogTitle>
                <DialogDescription>
                  Preencha os dados do paciente abaixo.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@exemplo.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(00) 00000-0000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-vision hover:bg-vision-dark">Salvar</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Data de Nascimento</TableHead>
                <TableHead>Última Consulta</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                        <User className="h-4 w-4 text-slate-600" />
                      </div>
                      {patient.name}
                    </div>
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>
                    {format(patient.birthdate, "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    {format(patient.lastVisit, "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm">
                      Histórico
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
