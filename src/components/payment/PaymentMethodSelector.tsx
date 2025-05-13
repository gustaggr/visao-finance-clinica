
import { useState } from "react";
import { PaymentMethod } from "@/models/payment";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  Wallet, 
  CircleDollarSign, 
  FileText, 
  Calendar
} from "lucide-react";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  onInstallmentsChange?: (installments: number) => void;
}

export default function PaymentMethodSelector({ 
  value, 
  onChange,
  onInstallmentsChange
}: PaymentMethodSelectorProps) {
  const [installments, setInstallments] = useState(1);
  
  const handleInstallmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setInstallments(value);
      if (onInstallmentsChange) {
        onInstallmentsChange(value);
      }
    }
  };

  return (
    <div className="space-y-4">
      <RadioGroup 
        value={value} 
        onValueChange={(val) => onChange(val as PaymentMethod)}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
      >
        <div>
          <RadioGroupItem
            value="credit_card"
            id="credit_card"
            className="peer sr-only"
          />
          <Label
            htmlFor="credit_card"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <CreditCard className="mb-3 h-6 w-6" />
            <span className="text-center">Cartão de Crédito</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="debit_card"
            id="debit_card"
            className="peer sr-only"
          />
          <Label
            htmlFor="debit_card"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <CreditCard className="mb-3 h-6 w-6" />
            <span className="text-center">Cartão de Débito</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="pix"
            id="pix"
            className="peer sr-only"
          />
          <Label
            htmlFor="pix"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <CircleDollarSign className="mb-3 h-6 w-6" />
            <span className="text-center">PIX</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="cash"
            id="cash"
            className="peer sr-only"
          />
          <Label
            htmlFor="cash"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Wallet className="mb-3 h-6 w-6" />
            <span className="text-center">Dinheiro</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="bank_slip"
            id="bank_slip"
            className="peer sr-only"
          />
          <Label
            htmlFor="bank_slip"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <FileText className="mb-3 h-6 w-6" />
            <span className="text-center">Boleto</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="recurring_payment"
            id="recurring_payment"
            className="peer sr-only"
          />
          <Label
            htmlFor="recurring_payment"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Calendar className="mb-3 h-6 w-6" />
            <span className="text-center">Pagamento Recorrente</span>
          </Label>
        </div>
      </RadioGroup>

      {(value === "credit_card" || value === "recurring_payment") && (
        <div className="mt-4">
          <Label htmlFor="installments" className="mb-2 block">
            Número de parcelas
          </Label>
          <Input
            id="installments"
            type="number"
            min="1"
            max="12"
            value={installments}
            onChange={handleInstallmentsChange}
            className="w-full max-w-[120px]"
          />
        </div>
      )}
    </div>
  );
}
