
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users, Calendar, FileText, BarChart3, Activity } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const appointmentData = [
  { name: "Jan", value: 40 },
  { name: "Fev", value: 35 },
  { name: "Mar", value: 45 },
  { name: "Abr", value: 50 },
  { name: "Mai", value: 55 },
  { name: "Jun", value: 60 },
  { name: "Jul", value: 65 }
];

const revenueData = [
  { name: "Jan", receita: 28000, despesas: 20000 },
  { name: "Fev", receita: 25000, despesas: 18000 },
  { name: "Mar", receita: 30000, despesas: 19000 },
  { name: "Abr", receita: 35000, despesas: 21000 },
  { name: "Mai", receita: 38000, despesas: 22000 },
  { name: "Jun", receita: 42000, despesas: 23000 },
  { name: "Jul", receita: 45000, despesas: 24000 }
];

const upcomingAppointments = [
  { id: 1, patient: "Maria Silva", time: "09:00", type: "Consulta" },
  { id: 2, patient: "João Santos", time: "10:30", type: "Retorno" },
  { id: 3, patient: "Ana Oliveira", time: "13:15", type: "Exame" },
  { id: 4, patient: "Carlos Lima", time: "15:45", type: "Consulta" },
];

const recentReports = [
  { id: 1, patient: "Pedro Alves", exam: "Mapeamento de retina", date: "15/05/2025" },
  { id: 2, patient: "Sandra Costa", exam: "Tonometria", date: "14/05/2025" },
  { id: 3, patient: "Marcos Souza", exam: "Topografia", date: "13/05/2025" },
];

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
            <Users className="h-4 w-4 text-vision" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in [animation-delay:100ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Novos Pacientes</CardTitle>
            <UserPlus className="h-4 w-4 text-vision" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              +23% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in [animation-delay:200ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Consultas do Mês</CardTitle>
            <Calendar className="h-4 w-4 text-vision" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in [animation-delay:300ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
            <BarChart3 className="h-4 w-4 text-vision" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.345</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4 animate-fade-in [animation-delay:400ms]">
          <CardHeader>
            <CardTitle>Receitas x Despesas (R$)</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="receita" fill="#6355C7" />
                <Bar dataKey="despesas" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 animate-fade-in [animation-delay:500ms]">
          <CardHeader>
            <CardTitle>Consultas por Mês</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={appointmentData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6355C7"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-4 animate-fade-in [animation-delay:600ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Próximas Consultas</CardTitle>
            <Calendar className="h-4 w-4 text-vision" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-slate-500">{appointment.type}</p>
                  </div>
                  <div className="rounded-full bg-vision-accent px-3 py-1 text-sm font-medium text-vision">
                    Hoje {appointment.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 animate-fade-in [animation-delay:700ms]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Laudos Recentes</CardTitle>
            <FileText className="h-4 w-4 text-vision" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{report.patient}</p>
                    <p className="text-sm text-slate-500">{report.exam}</p>
                  </div>
                  <div className="text-sm text-slate-500">{report.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
