import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, Building2, Briefcase, Download, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Reports = () => {
  const navigate = useNavigate();

  const monthlyStats = [
    { month: "มกราคม", students: 145, companies: 23, placements: 89 },
    { month: "กุมภาพันธ์", students: 167, companies: 28, placements: 102 },
    { month: "มีนาคม", students: 189, companies: 31, placements: 124 },
    { month: "เมษายน", students: 203, companies: 35, placements: 138 },
  ];

  const departmentStats = [
    { name: "วิศวกรรมคอมพิวเตอร์", students: 234, placements: 187, rate: 79.9 },
    { name: "บริหารธุรกิจ", students: 198, placements: 145, rate: 73.2 },
    { name: "วิศวกรรมไฟฟ้า", students: 167, placements: 119, rate: 71.3 },
    { name: "วิทยาการคอมพิวเตอร์", students: 156, placements: 108, rate: 69.2 },
    { name: "การตลาด", students: 145, placements: 95, rate: 65.5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/university/dashboard')} className="mb-4">
            ← กลับไปแดชบอร์ด
          </Button>
          <h1 className="text-3xl font-bold mb-2">รายงานและสถิติ 📊</h1>
          <p className="text-muted-foreground">ข้อมูลสถิติและการวิเคราะห์การจับคู่งาน</p>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>กรองข้อมูล</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <SelectValue placeholder="เลือกคณะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกคณะ</SelectItem>
                  <SelectItem value="engineering">วิศวกรรมศาสตร์</SelectItem>
                  <SelectItem value="business">บริหารธุรกิจ</SelectItem>
                  <SelectItem value="science">วิทยาศาสตร์</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                ดาวน์โหลดรายงาน
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">1,245</p>
                  <p className="text-sm text-muted-foreground">นักศึกษาทั้งหมด</p>
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
                  <p className="text-3xl font-bold">89</p>
                  <p className="text-sm text-muted-foreground">บริษัทพาร์ทเนอร์</p>
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
                  <p className="text-3xl font-bold">453</p>
                  <p className="text-sm text-muted-foreground">การจับคู่สำเร็จ</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-accent">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">72.4%</p>
                  <p className="text-sm text-muted-foreground">อัตราความสำเร็จ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>สถิติรายเดือน</CardTitle>
            <CardDescription>ข้อมูลการจับคู่งานในแต่ละเดือน</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{stat.month} 2024</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">นักศึกษาใหม่</p>
                        <p className="font-semibold text-primary">{stat.students} คน</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">บริษัทใหม่</p>
                        <p className="font-semibold text-success">{stat.companies} แห่ง</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">จับคู่สำเร็จ</p>
                        <p className="font-semibold text-accent">{stat.placements} คู่</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>สถิติตามสาขาวิชา</CardTitle>
            <CardDescription>อัตราการจับคู่งานแยกตามสาขา</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{dept.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dept.students} นักศึกษา • จับคู่สำเร็จ {dept.placements} คน
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{dept.rate}%</p>
                      <p className="text-xs text-muted-foreground">อัตราความสำเร็จ</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all" 
                      style={{ width: `${dept.rate}%` }}
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

export default Reports;
