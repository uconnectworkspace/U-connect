import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Approvals = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");

  const pendingCompanies = [
    { id: 1, name: "บริษัท Tech Innovation Ltd.", email: "contact@techinno.com", industry: "เทคโนโลยี", description: "บริษัทพัฒนาซอฟต์แวร์และแอปพลิเคชัน", submittedDate: "2 วันที่แล้ว" },
    { id: 2, name: "บริษัท Digital Solutions Co.", email: "hr@digitalsol.com", industry: "ที่ปรึกษา", description: "ให้คำปรึกษาด้านการตลาดดิจิทัล", submittedDate: "3 วันที่แล้ว" },
    { id: 3, name: "บริษัท Startup XYZ", email: "info@startupxyz.com", industry: "สตาร์ทอัพ", description: "พัฒนาแพลตฟอร์ม E-commerce", submittedDate: "5 วันที่แล้ว" },
  ];

  const approvedCompanies = [
    { id: 4, name: "บริษัท เทคโนโลยี ABC", email: "contact@abc.com", industry: "เทคโนโลยี", approvedDate: "1 สัปดาห์ที่แล้ว" },
    { id: 5, name: "บริษัท การเงิน XYZ", email: "hr@xyz.com", industry: "การเงิน", approvedDate: "2 สัปดาห์ที่แล้ว" },
  ];

  const rejectedCompanies = [
    { id: 6, name: "บริษัท Suspicious Inc.", email: "fake@sus.com", industry: "ไม่ระบุ", rejectedDate: "3 วันที่แล้ว", reason: "ข้อมูลไม่ครบถ้วน" },
  ];

  const handleApprove = (companyName: string) => {
    toast.success(`อนุมัติ ${companyName} เรียบร้อยแล้ว`);
  };

  const handleReject = (companyName: string) => {
    toast.error(`ปฏิเสธ ${companyName} เรียบร้อยแล้ว`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/university/dashboard')} className="mb-4">
            ← กลับไปแดชบอร์ด
          </Button>
          <h1 className="text-3xl font-bold mb-2">อนุมัติบริษัท 🏢</h1>
          <p className="text-muted-foreground">ตรวจสอบและอนุมัติบริษัทที่สมัครเข้าร่วมระบบ</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-yellow-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{pendingCompanies.length}</p>
                  <p className="text-sm text-muted-foreground">รออนุมัติ</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{approvedCompanies.length}</p>
                  <p className="text-sm text-muted-foreground">อนุมัติแล้ว</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-red-600">
                  <XCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{rejectedCompanies.length}</p>
                  <p className="text-sm text-muted-foreground">ปฏิเสธ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>รายการบริษัท</CardTitle>
            <CardDescription>จัดการคำขออนุมัติจากบริษัท</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">รออนุมัติ ({pendingCompanies.length})</TabsTrigger>
                <TabsTrigger value="approved">อนุมัติแล้ว ({approvedCompanies.length})</TabsTrigger>
                <TabsTrigger value="rejected">ปฏิเสธ ({rejectedCompanies.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-4">
                {pendingCompanies.map((company) => (
                  <Card key={company.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold">{company.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{company.email}</p>
                          <Badge variant="outline">{company.industry}</Badge>
                          <p className="text-sm mt-2">{company.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">ส่งคำขอเมื่อ {company.submittedDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          ดูรายละเอียด
                        </Button>
                        <Button size="sm" onClick={() => handleApprove(company.name)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          อนุมัติ
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(company.name)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          ปฏิเสธ
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4 mt-4">
                {approvedCompanies.map((company) => (
                  <Card key={company.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Building2 className="h-5 w-5 text-green-600" />
                            <h3 className="text-lg font-semibold">{company.name}</h3>
                            <Badge className="bg-green-500">อนุมัติแล้ว</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{company.email}</p>
                          <Badge variant="outline">{company.industry}</Badge>
                          <p className="text-xs text-muted-foreground mt-2">อนุมัติเมื่อ {company.approvedDate}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          ดูรายละเอียด
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-4 mt-4">
                {rejectedCompanies.map((company) => (
                  <Card key={company.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Building2 className="h-5 w-5 text-red-600" />
                            <h3 className="text-lg font-semibold">{company.name}</h3>
                            <Badge variant="destructive">ปฏิเสธ</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{company.email}</p>
                          <Badge variant="outline">{company.industry}</Badge>
                          <p className="text-sm text-red-600 mt-2">เหตุผล: {company.reason}</p>
                          <p className="text-xs text-muted-foreground mt-2">ปฏิเสธเมื่อ {company.rejectedDate}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          ดูรายละเอียด
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Approvals;
