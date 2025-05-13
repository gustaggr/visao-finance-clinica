
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText, Download, Printer, Share2, Eye } from "lucide-react";
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

// Mock data for reports with detailed ophthalmologic exam results
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
    eyeDetails: {
      right: {
        condition: "Normal",
        pressure: "14 mmHg",
        notes: "Sem anormalidades identificadas"
      },
      left: {
        condition: "Normal",
        pressure: "15 mmHg",
        notes: "Sem anormalidades identificadas"
      }
    }
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
    eyeDetails: {
      right: {
        condition: "Normal",
        pressure: "14 mmHg",
        notes: "Pressão dentro dos limites normais"
      },
      left: {
        condition: "Normal",
        pressure: "15 mmHg",
        notes: "Pressão dentro dos limites normais"
      }
    }
  },
  {
    id: "3",
    patientId: "1",
    patientName: "João Silva",
    doctorName: "Dr. Carlos Silva",
    title: "Exame de Refração",
    type: "Refração",
    date: new Date("2023-09-18"),
    description: "Avaliação da acuidade visual e prescrição de lentes corretivas.",
    results: `Resultado do exame de refração:

Olho direito (OD): 
- Esférico: -0.75
- Cilíndrico: -0.50
- Eixo: 180°
- Acuidade visual sem correção: 20/40
- Acuidade visual com correção: 20/20

Olho esquerdo (OE):
- Esférico: -1.25
- Cilíndrico: -0.75
- Eixo: 175°
- Acuidade visual sem correção: 20/60
- Acuidade visual com correção: 20/20

Distância pupilar: 62mm`,
    conclusion: "Diagnóstico de miopia leve no olho direito (0,75 graus) e miopia leve a moderada no olho esquerdo (1,25 graus), ambos com leve astigmatismo. Correção com lentes proporciona visão normal (20/20).",
    recommendations: "Uso de óculos para atividades que exijam visão de longe, especialmente direção e aulas. Retorno em 1 ano para reavaliação ou antes se houver mudança na acuidade visual.",
    images: [],
    eyeDetails: {
      right: {
        condition: "Miopia Leve",
        refraction: "-0.75 / -0.50 x 180°",
        visualAcuity: "20/40 (sem correção), 20/20 (com correção)"
      },
      left: {
        condition: "Miopia Leve a Moderada",
        refraction: "-1.25 / -0.75 x 175°",
        visualAcuity: "20/60 (sem correção), 20/20 (com correção)"
      }
    }
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

              {/* Detalhes dos Olhos */}
              {report.eyeDetails && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Detalhes do Diagnóstico</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Olho Direito */}
                    <Card className="border-2 border-slate-200">
                      <CardHeader className="bg-slate-50 pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                          <Eye className="h-4 w-4 text-vision" />
                          Olho Direito
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-2">
                        {report.eyeDetails.right.condition && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Condição</p>
                            <p className="font-medium">{report.eyeDetails.right.condition}</p>
                          </div>
                        )}
                        {report.eyeDetails.right.pressure && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Pressão Intraocular</p>
                            <p className="font-medium">{report.eyeDetails.right.pressure}</p>
                          </div>
                        )}
                        {report.eyeDetails.right.refraction && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Refração</p>
                            <p className="font-medium">{report.eyeDetails.right.refraction}</p>
                          </div>
                        )}
                        {report.eyeDetails.right.visualAcuity && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Acuidade Visual</p>
                            <p className="font-medium">{report.eyeDetails.right.visualAcuity}</p>
                          </div>
                        )}
                        {report.eyeDetails.right.notes && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Observações</p>
                            <p className="font-medium">{report.eyeDetails.right.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Olho Esquerdo */}
                    <Card className="border-2 border-slate-200">
                      <CardHeader className="bg-slate-50 pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                          <Eye className="h-4 w-4 text-vision" />
                          Olho Esquerdo
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-2">
                        {report.eyeDetails.left.condition && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Condição</p>
                            <p className="font-medium">{report.eyeDetails.left.condition}</p>
                          </div>
                        )}
                        {report.eyeDetails.left.pressure && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Pressão Intraocular</p>
                            <p className="font-medium">{report.eyeDetails.left.pressure}</p>
                          </div>
                        )}
                        {report.eyeDetails.left.refraction && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Refração</p>
                            <p className="font-medium">{report.eyeDetails.left.refraction}</p>
                          </div>
                        )}
                        {report.eyeDetails.left.visualAcuity && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Acuidade Visual</p>
                            <p className="font-medium">{report.eyeDetails.left.visualAcuity}</p>
                          </div>
                        )}
                        {report.eyeDetails.left.notes && (
                          <div>
                            <p className="text-sm font-medium text-slate-500">Observações</p>
                            <p className="font-medium">{report.eyeDetails.left.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

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
