
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function getContrastTextColor(bgColor: string): "text-white" | "text-black" {
  // For simplicity, we'll just return based on common color names
  const darkColors = ['blue', 'green', 'red', 'purple', 'black', 'gray', 'indigo', 'dark'];
  
  for (const color of darkColors) {
    if (bgColor.toLowerCase().includes(color)) {
      return "text-white";
    }
  }
  
  return "text-black";
}

export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 9);
}
