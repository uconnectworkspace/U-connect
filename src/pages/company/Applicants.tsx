import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, GraduationCap, Mail, Phone, FileText, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Applicants = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const applicants = [
    {
      id: 1,
      name: "สมชาย ใจดี",
      avatar: "👨‍💻",
      position: "Full-Stack Developer Intern",
      university: "จุฬาลงกรณ์มหาวิทยาลัย",
      faculty: "วิศวกรรมศาสตร์",
      year: "ปี 3",
      gpa: "3.65",
      email: "somchai@email.com",
      phone: "081-234-5678",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      status: "new",
      appliedDate: "2 วันที่แล้ว",
    },
    {
      id: 2,
      name: "สมหญิง รักเรียน",
      avatar: "👩‍💼",
      position: "Data Analyst Intern",
      university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
      faculty: "วิทยาศาสตร์",
      year: "ปี 4",
      gpa: "3.82",
      email: "somying@email.com",
      phone: "082-345-6789",
      skills: ["Python", "SQL", "Tableau", "Excel"],
      status: "reviewed",
      appliedDate: "3 วันที่แล้ว",
    },
    {
      id: 3,
      name: "วิทยา สร้างสรรค์",
      avatar: "👨‍🎓",
      position: "Marketing Intern",
      university: "มหาวิทยาลัยธรรมศาสตร์",
      faculty: "นิเทศศาสตร์",
      year: "ปี 3",
      gpa: "3.45",
      email: "wittaya@email.com",
      phone: "083-456-7890",
      skills: ["SEO", "Social Media", "Google Ads", "Content Writing"],
      status: "shortlisted",
      appliedDate: "5 วันที่แล้ว",
    },
    {
      id: 4,
      name: "ประภา ขยัน",
      avatar: "👩‍💻",
      position: "Full-Stack Developer Intern",
      university: "มหาวิทยาลัยเกษตรศาสตร์",
      faculty: "วิศวกรรมศาสตร์",
      year: "ปี 4",
      gpa: "3.75",
      email: "prapha@email.com",
      phone: "084-567-8901",
      skills: ["React", "Python", "PostgreSQL", "Docker"],
      status: "interview",
      appliedDate: "1 สัปดาห์ที่แล้ว",
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "new":
        return { label: "ใหม่", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" };
      case "reviewed":
        return { label: "ตรวจสอบแล้ว", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" };
      case "shortlisted":
        return { label: "คัดเลือกแล้ว", color: "bg-green-500/10 text-green-700 dark:text-green-400" };
      case "interview":
        return { label: "นัดสัมภาษณ์", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400" };
      case "rejected":
        return { label: "ไม่ผ่าน", color: "bg-red-500/10 text-red-700 dark:text-red-400" };
      default:
        return { label: status, color: "bg-muted" };
    }
  };

  const filterApplicants = (status?: string) => {
    if (!status) return applicants;
    return applicants.filter(app => app.status === status);
  };

  const handleStatusChange = (applicantName: string, newStatus: string) => {
    toast.success(`เปลี่ยนสถานะของ ${applicantName} เป็น ${getStatusInfo(newStatus).label}`);
  };

  const ApplicantCard = ({ applicant }: { applicant: typeof applicants[0] }) => {
    const statusInfo = getStatusInfo(applicant.status);

    return (
      <Card className="hover-scale">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="text-5xl">{applicant.avatar}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{applicant.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {applicant.university} - {applicant.faculty}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {applicant.year} | GPA: {applicant.gpa}
                  </p>
                </div>
                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium mb-2">สมัครตำแหน่ง: {applicant.position}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {applicant.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {applicant.phone}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">ทักษะ:</p>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Select defaultValue={applicant.status} onValueChange={(value) => handleStatusChange(applicant.name, value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">ใหม่</SelectItem>
                    <SelectItem value="reviewed">ตรวจสอบแล้ว</SelectItem>
                    <SelectItem value="shortlisted">คัดเลือก</SelectItem>
                    <SelectItem value="interview">นัดสัมภาษณ์</SelectItem>
                    <SelectItem value="rejected">ไม่ผ่าน</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  เรซูเม่
                </Button>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  ส่งข้อความ
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-3">สมัครเมื่อ {applicant.appliedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">จัดการผู้สมัคร</h1>
          <p className="text-muted-foreground">ตรวจสอบและคัดเลือกผู้สมัครงาน</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาชื่อ, มหาวิทยาลัย..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="ตำแหน่งงาน" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="dev">Developer</SelectItem>
                  <SelectItem value="data">Data Analyst</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="มหาวิทยาลัย" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกมหาวิทยาลัย</SelectItem>
                  <SelectItem value="cu">จุฬาลงกรณ์</SelectItem>
                  <SelectItem value="kmutt">ม.พระจอมเกล้าธนบุรี</SelectItem>
                  <SelectItem value="tu">ธรรมศาสตร์</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="all">ทั้งหมด ({applicants.length})</TabsTrigger>
            <TabsTrigger value="new">ใหม่ ({filterApplicants("new").length})</TabsTrigger>
            <TabsTrigger value="reviewed">ตรวจแล้ว ({filterApplicants("reviewed").length})</TabsTrigger>
            <TabsTrigger value="shortlisted">คัดเลือก ({filterApplicants("shortlisted").length})</TabsTrigger>
            <TabsTrigger value="interview">สัมภาษณ์ ({filterApplicants("interview").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {applicants.map(app => <ApplicantCard key={app.id} applicant={app} />)}
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            {filterApplicants("new").map(app => <ApplicantCard key={app.id} applicant={app} />)}
          </TabsContent>

          <TabsContent value="reviewed" className="space-y-4">
            {filterApplicants("reviewed").map(app => <ApplicantCard key={app.id} applicant={app} />)}
          </TabsContent>

          <TabsContent value="shortlisted" className="space-y-4">
            {filterApplicants("shortlisted").map(app => <ApplicantCard key={app.id} applicant={app} />)}
          </TabsContent>

          <TabsContent value="interview" className="space-y-4">
            {filterApplicants("interview").map(app => <ApplicantCard key={app.id} applicant={app} />)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Applicants;