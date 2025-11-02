import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, Building2, GraduationCap, Briefcase, Download, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AdminReports = () => {
  const navigate = useNavigate();

  const platformStats = [
    { month: "มกราคม", students: 245, companies: 32, universities: 4, placements: 178 },
    { month: "กุมภาพันธ์", students: 298, companies: 38, universities: 5, placements: 215 },
    { month: "มีนาคม", students: 356, companies: 42, universities: 6, placements: 267 },
    { month: "เมษายน", students: 412, companies: 48, universities: 6, placements: 312 },
  ];

  const universityPerformance = [
    { name: "จุฬาลงกรณ์มหาวิทยาลัย", students: 856, placements: 623, companies: 45, rate: 72.8 },
    { name: "มหาวิทยาลัยธรรมศาสตร์", students: 742, placements: 518, companies: 38, rate: 69.8 },
    { name: "มหาวิทยาลัยเกษตรศาสตร์", students: 689, placements: 467, companies: 34, rate: 67.8 },
    { name: "มหาวิทยาลัยมหิดล", students: 534, placements: 389, companies: 28, rate: 72.8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="mb-4">
            ← กลับไปแดชบอร์ด
          </Button>
          <h1 className="text-3xl font-bold mb-2">รายงานระบบแพลตฟอร์ม 📊</h1>
          <p className="text-muted-foreground">ภาพรวมและสถิติการใช้งานทั้งระบบ</p>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>กรองข้อมูล</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select defaultValue="2024">
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="เลือกปี" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="เลือกมหาวิทยาลัย" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกมหาวิทยาลัย</SelectItem>
                  <SelectItem value="chula">จุฬาลงกรณ์มหาวิทยาลัย</SelectItem>
                  <SelectItem value="tu">มหาวิทยาลัยธรรมศาสตร์</SelectItem>
                  <SelectItem value="ku">มหาวิทยาลัยเกษตรศาสตร์</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภทรายงาน" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="students">นักศึกษา</SelectItem>
                  <SelectItem value="companies">บริษัท</SelectItem>
                  <SelectItem value="placements">การจับคู่</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                ดาวน์โหลดรายงาน
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overall Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">2,847</p>
                  <p className="text-sm text-muted-foreground">นักศึกษา</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-success">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">บริษัท</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-accent">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">มหาวิทยาลัย</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-warning">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">1,423</p>
                  <p className="text-sm text-muted-foreground">จับคู่สำเร็จ</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-purple-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">72.1%</p>
                  <p className="text-sm text-muted-foreground">อัตราสำเร็จ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Growth Trends */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>การเติบโตของแพลตฟอร์ม</CardTitle>
            <CardDescription>สถิติรายเดือนของการใช้งานระบบ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformStats.map((stat, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-3">{stat.month} 2024</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">นักศึกษาใหม่</p>
                      <p className="text-2xl font-bold text-primary">{stat.students}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">บริษัทใหม่</p>
                      <p className="text-2xl font-bold text-success">{stat.companies}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">มหาวิทยาลัยใหม่</p>
                      <p className="text-2xl font-bold text-accent">{stat.universities}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">การจับคู่สำเร็จ</p>
                      <p className="text-2xl font-bold text-warning">{stat.placements}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* University Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>เปรียบเทียบประสิทธิภาพมหาวิทยาลัย</CardTitle>
            <CardDescription>อันดับและสถิติของมหาวิทยาลัยพาร์ทเนอร์</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {universityPerformance.map((uni, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{uni.name}</h4>
                        <div className="grid grid-cols-3 gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{uni.students} นักศึกษา</span>
                          <span>{uni.companies} บริษัท</span>
                          <span>{uni.placements} การจับคู่</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-green-600">{uni.rate}%</p>
                      <p className="text-xs text-muted-foreground">อัตราสำเร็จ</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all" 
                      style={{ width: `${uni.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
