
import { Link } from "react-router-dom";
import { Eye, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-white rounded-full p-6 shadow-sm">
            <Eye className="h-16 w-16 text-vision" />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-vision">404</h1>
        <h2 className="text-2xl font-semibold text-slate-900">Página não encontrada</h2>
        
        <p className="text-slate-600 max-w-md mx-auto">
          A página que você está tentando acessar não existe ou foi movida para outro endereço.
        </p>
        
        <Button asChild className="mt-8">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Voltar para o início</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
