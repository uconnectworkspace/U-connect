import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, GraduationCap, Briefcase, TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const overallStats = [
    { label: "นักศึกษาทั้งหมด", value: "2,847", icon: Users, color: "text-primary", trend: "+18%" },
    { label: "บริษัททั้งหมด", value: "156", icon: Building2, color: "text-success", trend: "+12%" },
    { label: "มหาวิทยาลัยพาร์ทเนอร์", value: "24", icon: GraduationCap, color: "text-accent", trend: "+5%" },
    { label: "การจับคู่สำเร็จ", value: "1,423", icon: TrendingUp, color: "text-warning", trend: "+25%" },
  ];

  const pendingActions = [
    { id: 1, type: "company", entity: "บริษัท Tech Innovation Ltd.", action: "รออนุมัติ", priority: "high" },
    { id: 2, type: "university", entity: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้า", action: "รออนุมัติ", priority: "high" },
    { id: 3, type: "student", entity: "รายงานพฤติกรรมผิดปกติ - นักศึกษา ID #1234", action: "ต้องตรวจสอบ", priority: "medium" },
    { id: 4, type: "company", entity: "บริษัท Digital Solutions Co.", action: "ขอยกเลิกการลงทะเบียน", priority: "low" },
  ];

  const recentActivities = [
    { id: 1, message: "มหาวิทยาลัยมหิดล ได้รับการอนุมัติเข้าร่วมระบบ", time: "5 นาทีที่แล้ว", icon: CheckCircle, color: "text-green-600" },
    { id: 2, message: "บริษัท ABC Tech ถูกปฏิเสธการเข้าร่วม", time: "1 ชั่วโมงที่แล้ว", icon: XCircle, color: "text-red-600" },
    { id: 3, message: "นักศึกษา 45 คน ลงทะเบียนใหม่วันนี้", time: "2 ชั่วโมงที่แล้ว", icon: Users, color: "text-blue-600" },
    { id: 4, message: "การจับคู่งาน 12 รายการสำเร็จในวันนี้", time: "3 ชั่วโมงที่แล้ว", icon: Briefcase, color: "text-purple-600" },
  ];

  const topStudents = [
    { id: 1, name: "สมชาย ใจดี", university: "จุฬาลงกรณ์มหาวิทยาลัย", applications: 23, hires: 5, rating: 4.9 },
    { id: 2, name: "สมหญิง ขยัน", university: "มหาวิทยาลัยธรรมศาสตร์", applications: 19, hires: 4, rating: 4.8 },
    { id: 3, name: "ทดสอบ เทส", university: "มหาวิทยาลัยเกษตรศาสตร์", applications: 18, hires: 4, rating: 4.7 },
  ];

  const topCompanies = [
    { id: 1, name: "บริษัท เทคโนโลยี A", jobs: 45, hires: 38, rating: 4.8 },
    { id: 2, name: "บริษัท การเงิน B", jobs: 32, hires: 28, rating: 4.7 },
    { id: 3, name: "บริษัท Consulting C", jobs: 28, hires: 24, rating: 4.6 },
  ];

  const topUniversities = [
    { id: 1, name: "จุฬาลงกรณ์มหาวิทยาลัย", students: 856, placements: 623, rate: "72.8%" },
    { id: 2, name: "มหาวิทยาลัยธรรมศาสตร์", students: 742, placements: 518, rate: "69.8%" },
    { id: 3, name: "มหาวิทยาลัยเกษตรศาสตร์", students: 689, placements: 467, rate: "67.8%" },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">เร่งด่วน</Badge>;
      case "medium":
        return <Badge variant="outline" className="text-yellow-600">ปานกลาง</Badge>;
      case "low":
        return <Badge variant="outline">ต่ำ</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard 👨‍💼</h1>
          <p className="text-muted-foreground">ระบบจัดการแพลตฟอร์มและดูข้อมูลรายละเอียดทั้งหมด</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => (
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

        {/* Pending Actions & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    รอดำเนินการ
                  </CardTitle>
                  <CardDescription>รายการที่ต้องตรวจสอบและอนุมัติ</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingActions.map((action) => (
                <div key={action.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{action.entity}</h4>
                      <p className="text-sm text-muted-foreground">{action.action}</p>
                    </div>
                    {getPriorityBadge(action.priority)}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">ดูรายละเอียด</Button>
                    <Button size="sm">ดำเนินการ</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>กิจกรรมล่าสุด</CardTitle>
              <CardDescription>ความเคลื่อนไหวในระบบ</CardDescription>
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

        {/* Top Performers Tabs */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>รายการยอดนิยม</CardTitle>
            <CardDescription>ข้อมูลสถิติของผู้ใช้งานที่โดดเด่น</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="students" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="students">นักศึกษา</TabsTrigger>
                <TabsTrigger value="companies">บริษัท</TabsTrigger>
                <TabsTrigger value="universities">มหาวิทยาลัย</TabsTrigger>
              </TabsList>
              
              <TabsContent value="students" className="space-y-4 mt-4">
                {topStudents.map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.university}</p>
                        <p className="text-xs text-muted-foreground">สมัคร {student.applications} ครั้ง • ได้งาน {student.hires} ครั้ง</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-600">
                        ⭐ {student.rating}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/students')}>
                  ดูนักศึกษาทั้งหมด
                </Button>
              </TabsContent>

              <TabsContent value="companies" className="space-y-4 mt-4">
                {topCompanies.map((company, index) => (
                  <div key={company.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{company.name}</h4>
                        <p className="text-sm text-muted-foreground">ประกาศงาน {company.jobs} ตำแหน่ง • จ้างงาน {company.hires} คน</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-600">
                        ⭐ {company.rating}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/companies')}>
                  ดูบริษัททั้งหมด
                </Button>
              </TabsContent>

              <TabsContent value="universities" className="space-y-4 mt-4">
                {topUniversities.map((university, index) => (
                  <div key={university.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{university.name}</h4>
                        <p className="text-sm text-muted-foreground">นักศึกษา {university.students} คน • จับคู่สำเร็จ {university.placements} คน</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-semibold">
                        {university.rate}
                      </div>
                      <p className="text-xs text-muted-foreground">อัตราความสำเร็จ</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/universities')}>
                  ดูมหาวิทยาลัยทั้งหมด
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>การดำเนินการด่วน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/admin/students')}>
                <Users className="h-6 w-6" />
                <span>จัดการนักศึกษา</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/admin/companies')}>
                <Building2 className="h-6 w-6" />
                <span>จัดการบริษัท</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/admin/universities')}>
                <GraduationCap className="h-6 w-6" />
                <span>จัดการมหาวิทยาลัย</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/admin/reports')}>
                <TrendingUp className="h-6 w-6" />
                <span>ดูรายงาน</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
