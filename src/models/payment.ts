
export type PaymentMethod = 
  | "credit_card" 
  | "debit_card" 
  | "pix" 
  | "cash" 
  | "bank_slip" 
  | "recurring_payment";

export type PaymentStatus = 
  | "paid" 
  | "pending" 
  | "installments" 
  | "refunded" 
  | "canceled";

export interface PaymentInstallment {
  id: string;
  amount: number;
  dueDate: Date;
  status: "paid" | "pending" | "overdue";
  paidDate?: Date;
}

export interface Payment {
  id: string;
  patientId: string;
  appointmentId?: string;
  description: string;
  totalAmount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: Date;
  installments?: PaymentInstallment[];
}
