
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { format, addMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PaymentMethod } from "@/models/payment";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";

export default function FinanceTransactions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("income");
  
  // Form state for income
  const [income, setIncome] = useState({
    description: "",
    amount: "",
    date: format(new Date(), "yyyy-MM-dd"),
    category: "",
    patient: "",
    notes: "",
    paymentMethod: "credit_card" as PaymentMethod,
    installments: 1,
  });

  // Form state for expense
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    date: format(new Date(), "yyyy-MM-dd"),
    category: "",
    vendor: "",
    notes: "",
    dueDate: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
  });

  // Handle income submission
  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Data validation
    if (!income.description || !income.amount || parseFloat(income.amount) <= 0) {
      toast.error("Preencha os campos obrigatórios corretamente.");
      return;
    }
    
    // Process installments if needed
    let installments = [];
    if ((income.paymentMethod === "credit_card" || income.paymentMethod === "recurring_payment") 
        && income.installments > 1) {
      const installmentAmount = parseFloat(income.amount) / income.installments;
      const currentDate = new Date(income.date);
      
      for (let i = 0; i < income.installments; i++) {
        const installmentDate = new Date(currentDate);
        installmentDate.setMonth(currentDate.getMonth() + i);
        
        installments.push({
          id: `inst-${Date.now()}-${i}`,
          amount: installmentAmount,
          dueDate: installmentDate,
          status: "pending"
        });
      }
    }
    
    // Here you would save the data to your database
    toast.success("Receita registrada com sucesso!");
    console.log("Income submitted:", { 
      ...income,
      amount: parseFloat(income.amount),
      installments: installments.length > 0 ? installments : undefined,
      paymentStatus: income.installments > 1 ? "installments" : "paid"
    });
    
    // Reset form and navigate back
    setIncome({
      description: "",
      amount: "",
      date: format(new Date(), "yyyy-MM-dd"),
      category: "",
      patient: "",
      notes: "",
      paymentMethod: "credit_card",
      installments: 1,
    });
    navigate("/finances");
  };

  // Handle expense submission
  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Data validation
    if (!expense.description || !expense.amount || parseFloat(expense.amount) <= 0) {
      toast.error("Preencha os campos obrigatórios corretamente.");
      return;
    }
    
    // Here you would save the data to your database
    toast.success("Despesa registrada com sucesso!");
    console.log("Expense submitted:", {
      ...expense,
      amount: parseFloat(expense.amount),
    });
    
    // Reset form and navigate back
    setExpense({
      description: "",
      amount: "",
      date: format(new Date(), "yyyy-MM-dd"),
      category: "",
      vendor: "",
      notes: "",
      dueDate: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
    });
    navigate("/finances");
  };

  return (
    <DashboardLayout title="Nova Transação Financeira">
      <div className="mx-auto max-w-3xl">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="income" className="flex-1">Receita</TabsTrigger>
            <TabsTrigger value="expense" className="flex-1">Despesa</TabsTrigger>
          </TabsList>
          
          {/* Income Form */}
          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle>Registrar Nova Receita</CardTitle>
                <CardDescription>
                  Adicione detalhes da receita, incluindo método de pagamento e possíveis parcelas.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleIncomeSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição *</Label>
                      <Input
                        id="description"
                        placeholder="Consulta, exame, etc."
                        value={income.description}
                        onChange={(e) => setIncome({ ...income, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Valor (R$) *</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={income.amount}
                        onChange={(e) => setIncome({ ...income, amount: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        value={income.date}
                        onChange={(e) => setIncome({ ...income, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select
                        value={income.category}
                        onValueChange={(value) => setIncome({ ...income, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Consulta</SelectItem>
                          <SelectItem value="exam">Exame</SelectItem>
                          <SelectItem value="product">Venda de Produto</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient">Paciente</Label>
                    <Input
                      id="patient"
                      placeholder="Nome do paciente"
                      value={income.patient}
                      onChange={(e) => setIncome({ ...income, patient: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Método de Pagamento</Label>
                    <PaymentMethodSelector 
                      value={income.paymentMethod}
                      onChange={(method) => setIncome({ ...income, paymentMethod: method })}
                      onInstallmentsChange={(installments) => setIncome({ ...income, installments })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      placeholder="Informações adicionais"
                      value={income.notes}
                      onChange={(e) => setIncome({ ...income, notes: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => navigate("/finances")}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar Receita</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          {/* Expense Form */}
          <TabsContent value="expense">
            <Card>
              <CardHeader>
                <CardTitle>Registrar Nova Despesa</CardTitle>
                <CardDescription>
                  Adicione detalhes da despesa, incluindo data de vencimento para contas a pagar.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleExpenseSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-description">Descrição *</Label>
                      <Input
                        id="expense-description"
                        placeholder="Aluguel, insumos, etc."
                        value={expense.description}
                        onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expense-amount">Valor (R$) *</Label>
                      <Input
                        id="expense-amount"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={expense.amount}
                        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-date">Data da Despesa</Label>
                      <Input
                        id="expense-date"
                        type="date"
                        value={expense.date}
                        onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expense-category">Categoria</Label>
                      <Select
                        value={expense.category}
                        onValueChange={(value) => setExpense({ ...expense, category: value })}
                      >
                        <SelectTrigger id="expense-category">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent">Aluguel</SelectItem>
                          <SelectItem value="utilities">Serviços Públicos</SelectItem>
                          <SelectItem value="supplies">Insumos</SelectItem>
                          <SelectItem value="salaries">Salários</SelectItem>
                          <SelectItem value="maintenance">Manutenção</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendor">Fornecedor</Label>
                      <Input
                        id="vendor"
                        placeholder="Nome do fornecedor"
                        value={expense.vendor}
                        onChange={(e) => setExpense({ ...expense, vendor: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="due-date">Data de Vencimento</Label>
                      <Input
                        id="due-date"
                        type="date"
                        value={expense.dueDate}
                        onChange={(e) => setExpense({ ...expense, dueDate: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expense-notes">Observações</Label>
                    <Textarea
                      id="expense-notes"
                      placeholder="Informações adicionais"
                      value={expense.notes}
                      onChange={(e) => setExpense({ ...expense, notes: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => navigate("/finances")}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar Despesa</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
