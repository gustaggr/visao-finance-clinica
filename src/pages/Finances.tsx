
import { useState } from "react";
import { BarChart3, DollarSign, Download, Calendar, TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const monthlyRevenueData = [
  { name: "Jan", receita: 28000, despesas: 20000 },
  { name: "Fev", receita: 25000, despesas: 18000 },
  { name: "Mar", receita: 30000, despesas: 19000 },
  { name: "Abr", receita: 35000, despesas: 21000 },
  { name: "Mai", receita: 38000, despesas: 22000 },
  { name: "Jun", receita: 42000, despesas: 23000 },
  { name: "Jul", receita: 45000, despesas: 24000 }
];

const dailyRevenueData = [
  { name: "01/07", receita: 1500, despesas: 800 },
  { name: "02/07", receita: 2200, despesas: 900 },
  { name: "03/07", receita: 1800, despesas: 700 },
  { name: "04/07", receita: 2000, despesas: 850 },
  { name: "05/07", receita: 1950, despesas: 780 },
  { name: "06/07", receita: 2300, despesas: 910 },
  { name: "07/07", receita: 2100, despesas: 850 }
];

const transactions = [
  { id: 1, description: "Consulta - Maria Silva", date: "15/05/2025", amount: 250, type: "receita" },
  { id: 2, description: "Exame OCT - João Pereira", date: "15/05/2025", amount: 350, type: "receita" },
  { id: 3, description: "Pagamento Fornecedor XYZ", date: "14/05/2025", amount: 1200, type: "despesa" },
  { id: 4, description: "Consulta - Fernando Costa", date: "14/05/2025", amount: 250, type: "receita" },
  { id: 5, description: "Compra de Materiais", date: "13/05/2025", amount: 450, type: "despesa" },
  { id: 6, description: "Exame Tonometria - Lucia Ferreira", date: "13/05/2025", amount: 180, type: "receita" },
  { id: 7, description: "Pagamento Energia", date: "12/05/2025", amount: 380, type: "despesa" },
  { id: 8, description: "Consulta - Roberto Lima", date: "12/05/2025", amount: 250, type: "receita" },
];

export default function Finances() {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "ascending" | "descending";
  }>({ key: "date", direction: "descending" });

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const totalRevenue = transactions
    .filter((t) => t.type === "receita")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const totalExpenses = transactions
    .filter((t) => t.type === "despesa")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <DashboardLayout title="Sistema Financeiro">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Balanço</CardTitle>
            <DollarSign className="h-4 w-4 text-vision" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(totalRevenue - totalExpenses).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="month" className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="day">Diário</TabsTrigger>
            <TabsTrigger value="month">Mensal</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Calendar className="h-4 w-4" />
              <span>Período</span>
            </Button>
            <Button variant="outline" className="flex gap-2">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>

        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receitas e Despesas - Diário</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={dailyRevenueData}
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
                  <Tooltip formatter={(value) => `R$ ${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="receita" stroke="#6355C7" strokeWidth={2} />
                  <Line type="monotone" dataKey="despesas" stroke="#E11D48" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receitas e Despesas - Mensal</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={monthlyRevenueData}
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
                  <Tooltip formatter={(value) => `R$ ${value}`} />
                  <Legend />
                  <Bar dataKey="receita" fill="#6355C7" />
                  <Bar dataKey="despesas" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-vision" />
            Últimas Transações
          </CardTitle>
          <Button variant="outline" size="sm">
            Ver tudo
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => requestSort('description')}
                >
                  Descrição
                  {sortConfig.key === 'description' && (
                    <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => requestSort('date')}
                >
                  Data
                  {sortConfig.key === 'date' && (
                    <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer text-right"
                  onClick={() => requestSort('amount')}
                >
                  Valor
                  {sortConfig.key === 'amount' && (
                    <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => requestSort('type')}
                >
                  Tipo
                  {sortConfig.key === 'type' && (
                    <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        transaction.type === "receita"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {transaction.type === "receita" ? "Receita" : "Despesa"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
