import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Eye, MessageSquare, TrendingUp, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const CompanyDashboard = () => {
  const navigate = useNavigate();

  const activeJobs = [
    { id: 1, position: "Full-Stack Developer Intern", applicants: 45, views: 234, posted: "2 วันที่แล้ว", status: "active" },
    { id: 2, position: "Data Analyst Intern", applicants: 32, views: 189, posted: "5 วันที่แล้ว", status: "active" },
    { id: 3, position: "Marketing Intern", applicants: 28, views: 156, posted: "1 สัปดาห์ที่แล้ว", status: "active" },
  ];

  const recentApplicants = [
    { id: 1, name: "สมชาย ใจดี", position: "Full-Stack Developer Intern", university: "จุฬาลงกรณ์มหาวิทยาลัย", skills: ["React", "Node.js"], status: "new" },
    { id: 2, name: "สมหญิง รักเรียน", position: "Data Analyst Intern", university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี", skills: ["Python", "SQL"], status: "reviewed" },
    { id: 3, name: "วิทยา สร้างสรรค์", position: "Marketing Intern", university: "มหาวิทยาลัยธรรมศาสตร์", skills: ["SEO", "Social Media"], status: "shortlisted" },
  ];

  const stats = [
    { label: "ตำแหน่งที่เปิดรับ", value: "3", icon: Briefcase, color: "text-primary" },
    { label: "ผู้สมัครทั้งหมด", value: "105", icon: Users, color: "text-success" },
    { label: "รอการพิจารณา", value: "12", icon: Eye, color: "text-warning" },
    { label: "ข้อความใหม่", value: "5", icon: MessageSquare, color: "text-accent" },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "new":
        return { label: "ใหม่", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" };
      case "reviewed":
        return { label: "ตรวจสอบแล้ว", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" };
      case "shortlisted":
        return { label: "คัดเลือกแล้ว", color: "bg-green-500/10 text-green-700 dark:text-green-400" };
      default:
        return { label: status, color: "bg-muted" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">แดशบอร์ดบริษัท 🏢</h1>
            <p className="text-muted-foreground">จัดการตำแหน่งงานและผู้สมัคร</p>
          </div>
          <Button className="shadow-primary" onClick={() => navigate('/company/post-job')}>
            <Plus className="h-4 w-4 mr-2" />
            ประกาศงานใหม่
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-scale">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Jobs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>ตำแหน่งที่เปิดรับ</CardTitle>
                  <CardDescription>ติดตามประสิทธิภาพของประกาศงาน</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/company/post-job')}>
                  เพิ่มใหม่
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold">{job.position}</h4>
                    <Badge variant="outline" className="text-green-600">เปิดรับ</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {job.applicants} ผู้สมัคร
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {job.views} ครั้ง
                    </span>
                    <span>{job.posted}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => navigate('/company/applicants')}>
                      ดูผู้สมัคร
                    </Button>
                    <Button size="sm" variant="ghost">แก้ไข</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Applicants */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    ผู้สมัครล่าสุด
                  </CardTitle>
                  <CardDescription>ผู้สมัครที่ส่งใบสมัครเข้ามาใหม่</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/company/applicants')}>
                  ดูทั้งหมด
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplicants.map((applicant) => {
                const statusInfo = getStatusInfo(applicant.status);
                return (
                  <div key={applicant.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{applicant.name}</h4>
                        <p className="text-sm text-muted-foreground">{applicant.university}</p>
                      </div>
                      <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">สมัคร: {applicant.position}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {applicant.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <Button size="sm">ดูโปรไฟล์</Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>การดำเนินการด่วน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/company/applicants')}>
                <Users className="h-6 w-6" />
                <span>จัดการผู้สมัคร</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/company/search')}>
                <Eye className="h-6 w-6" />
                <span>ค้นหาผู้สมัคร</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/company/messages')}>
                <MessageSquare className="h-6 w-6" />
                <span>ข้อความ</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;