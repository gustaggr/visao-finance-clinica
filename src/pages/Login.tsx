
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-vision"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5C8.02944 5 4.98889 7.57111 3.41822 9.47823C2.6302 10.4303 2.23619 10.9063 2.2378 11.9998C2.23941 13.0933 2.63586 13.5697 3.42877 14.5226C4.99943 16.4297 8.02944 19 12 19C15.9706 19 19.0111 16.4289 20.5818 14.5218C21.3698 13.5697 21.7638 13.0937 21.7622 12.0002C21.7606 10.9067 21.3641 10.4303 20.5712 9.47737C19.0006 7.57031 15.9706 5 12 5Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-2xl font-bold text-vision">VisionCare</span>
          </div>
          <h2 className="text-lg font-medium text-slate-800">
            Clínica Oftalmológica
          </h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-vision hover:bg-vision-dark"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p className="mb-2">Credenciais de demonstração:</p>
          <div className="space-y-1">
            <p>Doutor: dr.carlos@visioncare.com / 123456</p>
            <p>Funcionário: ana@visioncare.com / 123456</p>
            <p>Paciente: joao@email.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
