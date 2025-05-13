
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText, Download, Printer, Share2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for reports
const mockReports = [
  {
    id: "1",
    patientId: "1",
    patientName: "João Silva",
    doctorName: "Dr. Carlos Silva",
    title: "Exame de Mapeamento de Retina",
    type: "Mapeamento de Retina",
    date: new Date("2023-11-15"),
    description: "Mapeamento de retina para avaliação de condições oculares.",
    results: `Análise detalhada da retina e estruturas associadas.
    
Olho direito: Retina aplicada em todos os quadrantes. Mácula com reflexo preservado e sem alterações visíveis. Disco óptico de tamanho normal, com bordas bem definidas. Vasos de calibre normal.

Olho esquerdo: Retina aplicada em todos os quadrantes. Mácula sem alterações visíveis. Disco óptico de coloração e tamanho normais. Vasos de calibre preservado.

Não foram identificadas lesões suspeitas, descolamentos ou hemorragias em ambos os olhos.`,
    conclusion: "Exame de mapeamento de retina sem alterações significativas. Retina aplicada em ambos os olhos, sem sinais de descolamento, lesões ou degenerações que necessitem de intervenção imediata.",
    recommendations: "Manter acompanhamento oftalmológico anual. Uso de óculos de proteção solar em ambientes externos. Retorno se apresentar sintomas como flashes de luz, moscas volantes súbitas ou alterações visuais.",
    images: [
      "https://www.eyedocshoppe.com/wp-content/uploads/2019/11/normal-retina-autofluorescence.jpg",
      "https://www.nature.com/articles/s41598-019-55077-y/figures/1",
    ],
  },
  {
    id: "2",
    patientId: "3",
    patientName: "Pedro Santos",
    doctorName: "Dr. Carlos Silva",
    title: "Exame de Tonometria",
    type: "Tonometria",
    date: new Date("2023-10-22"),
    description: "Medição da pressão intraocular.",
    results: `Medição de pressão intraocular em ambos os olhos:

Olho direito: 14 mmHg
Olho esquerdo: 15 mmHg

Exame realizado com tonômetro de aplanação de Goldmann.`,
    conclusion: "Pressão intraocular dentro dos padrões normais em ambos os olhos. Não foram identificados sinais de hipertensão ocular ou hipotensão significativa.",
    recommendations: "Manter acompanhamento oftalmológico anual. Recomenda-se evitar o uso prolongado de corticoides sem supervisão médica.",
    images: [],
  },
  {
    id: "3",
    patientId: "1",
    patientName: "João Silva",
    doctorName: "Dr. Carlos Silva",
    title: "Exame de Campo Visual",
    type: "Campimetria",
    date: new Date("2023-09-18"),
    description: "Avaliação do campo de visão periférica e central.",
    results: `Campimetria computadorizada 24-2 SITA Standard:

Olho direito: Sensibilidade média de 27 dB. Não foram detectados escotomas absolutos ou relativos significativos. Índice de confiabilidade: 92%.

Olho esquerdo: Sensibilidade média de 28 dB. Sem escotomas significativos. Índice de confiabilidade: 95%.`,
    conclusion: "Campo visual computadorizado dentro dos limites da normalidade em ambos os olhos. Não foram identificados defeitos campimétricos sugestivos de patologias neuroftalmológicas ou retinianas.",
    recommendations: "Controle anual. Manter boa hidratação e evitar fadiga ocular prolongada.",
    images: [
      "https://www.nature.com/articles/eye2015154/figures/2",
    ],
  },
];

export default function ViewReport() {
  const { id } = useParams();
  const [report, setReport] = useState<typeof mockReports[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundReport = mockReports.find((r) => r.id === id);
      
      // For patient users, verify if the report belongs to them
      if (user?.role === "patient" && foundReport && foundReport.patientId !== user.id) {
        toast.error("Você não tem permissão para visualizar este laudo");
        setReport(null);
      } else {
        setReport(foundReport || null);
      }
      
      setLoading(false);
    }, 800);
  }, [id, user]);

  if (loading) {
    return (
      <DashboardLayout title="Carregando...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-lg text-slate-600">Carregando laudo...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!report) {
    return (
      <DashboardLayout title="Laudo não encontrado">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FileText className="h-16 w-16 text-slate-300 mb-4" />
              <p className="text-xl font-medium text-slate-600 mb-2">Laudo não encontrado</p>
              <p className="text-slate-500">O laudo que você está procurando não existe ou você não tem permissão para visualizá-lo.</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={`Laudo: ${report.title}`}>
      <div className="space-y-6 pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{report.title}</h1>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <Badge variant="outline">{report.type}</Badge>
              <span>·</span>
              <span>
                {format(report.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1.5" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-1.5" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1.5" />
              Download
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">Paciente</h3>
                <p className="font-medium">{report.patientName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">Médico Responsável</h3>
                <p className="font-medium">{report.doctorName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">Data do Exame</h3>
                <p className="font-medium">
                  {format(report.date, "dd/MM/yyyy", { locale: ptBR })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">Tipo de Exame</h3>
                <p className="font-medium">{report.type}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Descrição do Exame</h3>
                <p className="text-slate-700">{report.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Resultados</h3>
                <div className="whitespace-pre-line text-slate-700">{report.results}</div>
              </div>

              {report.images.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Imagens</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {report.images.map((image, index) => (
                      <div key={index} className="overflow-hidden rounded-md border bg-slate-50">
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src={image}
                            alt={`Imagem ${index + 1} do exame`}
                            className="h-full w-full object-cover"
                          />
                        </AspectRatio>
                        <div className="p-2 text-sm text-slate-500 text-center">
                          Imagem {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-2">Conclusão</h3>
                <p className="text-slate-700">{report.conclusion}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Recomendações</h3>
                <p className="text-slate-700">{report.recommendations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
