import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Briefcase, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const UniversityDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "นักศึกษาทั้งหมด", value: "1,245", icon: Users, color: "text-primary", trend: "+12%" },
    { label: "บริษัทพาร์ทเนอร์", value: "89", icon: Building2, color: "text-success", trend: "+8%" },
    { label: "ตำแหน่งงานเปิดรับ", value: "156", icon: Briefcase, color: "text-warning", trend: "+15%" },
    { label: "การจ้างงานสำเร็จ", value: "342", icon: TrendingUp, color: "text-accent", trend: "+23%" },
  ];

  const pendingApprovals = [
    { id: 1, company: "บริษัท เทคโนโลยี ABC", type: "ขอเข้าร่วม", date: "2 วันที่แล้ว", status: "pending" },
    { id: 2, company: "บริษัท การเงิน XYZ", type: "ขอเข้าร่วม", date: "3 วันที่แล้ว", status: "pending" },
    { id: 3, company: "บริษัท Startup Innovation", type: "ขอเข้าร่วม", date: "5 วันที่แล้ว", status: "pending" },
  ];

  const recentActivities = [
    { id: 1, type: "placement", message: "นักศึกษา 15 คน ได้รับการจ้างงานในเดือนนี้", time: "1 ชั่วโมงที่แล้ว", icon: CheckCircle, color: "text-green-600" },
    { id: 2, type: "company", message: "บริษัท Tech Solutions ลงประกาศงาน 3 ตำแหน่ง", time: "3 ชั่วโมงที่แล้ว", icon: Briefcase, color: "text-blue-600" },
    { id: 3, type: "student", message: "นักศึกษาใหม่ 45 คน ลงทะเบียนในสัปดาห์นี้", time: "1 วันที่แล้ว", icon: Users, color: "text-purple-600" },
    { id: 4, type: "warning", message: "ประกาศงาน 2 รายการรอการตรวจสอบ", time: "2 วันที่แล้ว", icon: AlertCircle, color: "text-yellow-600" },
  ];

  const topCompanies = [
    { id: 1, name: "บริษัท เทคโนโลยี A", hires: 45, rating: 4.8 },
    { id: 2, name: "บริษัท การเงิน B", hires: 38, rating: 4.6 },
    { id: 3, name: "บริษัท Consulting C", hires: 32, rating: 4.7 },
    { id: 4, name: "บริษัท E-commerce D", hires: 28, rating: 4.5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">แดชบอร์ดมหาวิทยาลัย 🏛️</h1>
          <p className="text-muted-foreground">ภาพรวมการจัดการระบบจับคู่งาน</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-scale">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-warning" />
                    รอการอนุมัติ
                  </CardTitle>
                  <CardDescription>บริษัทที่รอการตรวจสอบและอนุมัติ</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/university/approvals')}>
                  ดูทั้งหมด
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{approval.company}</h4>
                      <p className="text-sm text-muted-foreground">{approval.type}</p>
                    </div>
                    <Badge variant="outline" className="text-yellow-600">รอดำเนินการ</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{approval.date}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">ตรวจสอบ</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>กิจกรรมล่าสุด</CardTitle>
                  <CardDescription>ความเคลื่อนไหวในระบบ</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top Companies */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>บริษัทพาร์ทเนอร์ยอดนิยม</CardTitle>
                <CardDescription>บริษัทที่จ้างนักศึกษามากที่สุด</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/university/reports')}>
                ดูรายงาน
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={company.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{company.name}</h4>
                      <p className="text-sm text-muted-foreground">{company.hires} การจ้างงาน</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-600">
                      ⭐ {company.rating}
                    </div>
                    <p className="text-xs text-muted-foreground">คะแนนเฉลี่ย</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>การดำเนินการด่วน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/university/approvals')}>
                <CheckCircle className="h-6 w-6" />
                <span>อนุมัติบริษัท</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/university/reports')}>
                <TrendingUp className="h-6 w-6" />
                <span>ดูรายงาน</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/university/announcements')}>
                <AlertCircle className="h-6 w-6" />
                <span>สร้างประกาศ</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Users className="h-6 w-6" />
                <span>จัดการนักศึกษา</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UniversityDashboard;