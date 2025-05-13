
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Settings() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "(11) 98765-4321",
    specialization: user?.role === "doctor" ? "Oftalmologista" : "",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
  });
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Perfil atualizado com sucesso!");
  };
  
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <DashboardLayout title="Configurações">
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            {user?.role === "doctor" && (
              <TabsTrigger value="clinic">Dados da Clínica</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais e de contato.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    {user?.role === "doctor" && (
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Especialização</Label>
                        <Input
                          id="specialization"
                          value={profileData.specialization}
                          onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-vision hover:bg-vision-dark">Salvar alterações</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Configure como e quando deseja receber notificações.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificações por E-mail</p>
                      <p className="text-sm text-slate-500">Receba notificações por e-mail</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationChange("emailNotifications")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificações por SMS</p>
                      <p className="text-sm text-slate-500">Receba notificações por SMS</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={() => handleNotificationChange("smsNotifications")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Lembretes de Consulta</p>
                      <p className="text-sm text-slate-500">Receba lembretes sobre suas próximas consultas</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.appointmentReminders}
                      onCheckedChange={() => handleNotificationChange("appointmentReminders")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">E-mails de Marketing</p>
                      <p className="text-sm text-slate-500">Receba e-mails sobre promoções e novidades</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={() => handleNotificationChange("marketingEmails")}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-vision hover:bg-vision-dark" onClick={() => toast.success("Preferências de notificação salvas!")}>
                  Salvar preferências
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Gerencie sua senha e configurações de segurança.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-vision hover:bg-vision-dark" onClick={() => toast.success("Senha alterada com sucesso!")}>
                  Alterar senha
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {user?.role === "doctor" && (
            <TabsContent value="clinic" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Clínica</CardTitle>
                  <CardDescription>
                    Gerencie as informações da sua clínica.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clinic-name">Nome da clínica</Label>
                      <Input id="clinic-name" defaultValue="VisionCare Oftalmologia" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinic-email">E-mail de contato</Label>
                      <Input id="clinic-email" type="email" defaultValue="contato@visioncare.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinic-phone">Telefone</Label>
                      <Input id="clinic-phone" defaultValue="(11) 3456-7890" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinic-address">Endereço</Label>
                      <Input id="clinic-address" defaultValue="Av. Paulista, 1000, São Paulo - SP" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-vision hover:bg-vision-dark" onClick={() => toast.success("Dados da clínica atualizados!")}>
                    Salvar alterações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
