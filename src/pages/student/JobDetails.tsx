import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, Clock, DollarSign, Users, Briefcase, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const JobDetails = () => {
  const navigate = useNavigate();

  const jobData = {
    title: "Full Stack Developer Intern",
    company: "บริษัท เทคโนโลยี ABC จำกัด",
    location: "กรุงเทพมหานคร (สามารถ WFH ได้)",
    type: "ฝึกงาน",
    salary: "15,000 - 20,000 บาท/เดือน",
    posted: "2 วันที่แล้ว",
    applicants: 45,
    description: "เรากำลังมองหา Full Stack Developer Intern ที่มีความกระตือรือร้นและพร้อมเรียนรู้เทคโนโลยีใหม่ๆ มาร่วมงานกับทีมของเรา คุณจะได้ทำงานกับโปรเจกต์จริงและได้รับประสบการณ์ที่มีค่า",
    responsibilities: [
      "พัฒนาและดูแล Web Application ทั้งฝั่ง Frontend และ Backend",
      "ทำงานร่วมกับทีม Design และ Product เพื่อสร้าง Feature ใหม่ๆ",
      "เขียน Unit Test และ Integration Test",
      "ปรับปรุง Performance และ Security ของระบบ",
      "เข้าร่วม Code Review และ Agile Development Process"
    ],
    requirements: [
      "กำลังศึกษาหรือจบการศึกษาด้าน Computer Science, Software Engineering หรือสาขาที่เกี่ยวข้อง",
      "มีความรู้พื้นฐานเกี่ยวกับ HTML, CSS, JavaScript",
      "มีประสบการณ์ใช้งาน React, Node.js, หรือ TypeScript (พิจารณาเป็นพิเศษ)",
      "มีทักษะการแก้ปัญหาและการทำงานเป็นทีม",
      "สามารถสื่อสารภาษาอังกฤษได้ในระดับดี"
    ],
    benefits: [
      "ค่าตอบแทน 15,000 - 20,000 บาท/เดือน",
      "ทำงาน 5 วัน/สัปดาห์ (จันทร์-ศุกร์)",
      "สามารถ Work from Home ได้ 2 วัน/สัปดาห์",
      "อุปกรณ์ทำงานครบครัน (Laptop, Monitor)",
      "โอกาสได้งานเต็มเวลาหลังจบฝึกงาน",
      "สภาพแวดล้อมการทำงานแบบ Startup ที่เป็นกันเอง"
    ],
    companyInfo: {
      name: "บริษัท เทคโนโลยี ABC จำกัด",
      industry: "เทคโนโลยี / Software Development",
      size: "51-200 คน",
      website: "www.abctech.com",
      description: "บริษัทพัฒนาซอฟต์แวร์ชั้นนำที่มุ่งเน้นการสร้างนวัตกรรมทางเทคโนโลยี เรามีโปรเจกต์ที่หลากหลายและทีมงานที่เชี่ยวชาญ"
    }
  };

  const handleApply = () => {
    toast.success("สมัครงานสำเร็จ! บริษัทจะพิจารณาและติดต่อกลับภายใน 3-5 วันทำการ");
    setTimeout(() => navigate('/student/applications'), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/student/jobs')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับไปหน้าค้นหางาน
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{jobData.title}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Building2 className="h-4 w-4" />
                      <span>{jobData.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-primary">
                        <MapPin className="h-3 w-3 mr-1" />
                        {jobData.location}
                      </Badge>
                      <Badge variant="outline" className="text-success">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {jobData.type}
                      </Badge>
                      <Badge variant="outline" className="text-warning">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {jobData.salary}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {jobData.posted}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {jobData.applicants} ผู้สมัคร
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>รายละเอียดงาน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-muted-foreground">{jobData.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">หน้าที่ความรับผิดชอบ</h3>
                  <ul className="space-y-2">
                    {jobData.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">คุณสมบัติที่ต้องการ</h3>
                  <ul className="space-y-2">
                    {jobData.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">สวัสดิการและผลตอบแทน</h3>
                  <ul className="space-y-2">
                    {jobData.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>เกี่ยวกับบริษัท</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{jobData.companyInfo.name}</h3>
                  <p className="text-muted-foreground text-sm">{jobData.companyInfo.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">อุตสาหกรรม</p>
                    <p className="font-medium">{jobData.companyInfo.industry}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ขนาดบริษัท</p>
                    <p className="font-medium">{jobData.companyInfo.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">เว็บไซต์</p>
                    <p className="font-medium text-primary">{jobData.companyInfo.website}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>สมัครงานตำแหน่งนี้</CardTitle>
                <CardDescription>ส่งใบสมัครของคุณตอนนี้</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" onClick={handleApply}>
                  สมัครงานตำแหน่งนี้
                </Button>
                <Button variant="outline" className="w-full">
                  บันทึกงาน
                </Button>
                <div className="text-xs text-muted-foreground text-center">
                  โปรไฟล์และเรซูเม่ของคุณจะถูกส่งไปยังบริษัท
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">งานที่คล้ายกัน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "Frontend Developer Intern", company: "บริษัท XYZ", salary: "12,000-18,000" },
                  { title: "Backend Developer Intern", company: "บริษัท DEF", salary: "15,000-20,000" },
                  { title: "Mobile Developer Intern", company: "บริษัท GHI", salary: "14,000-19,000" }
                ].map((job, index) => (
                  <div key={index} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">{job.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{job.company}</p>
                    <p className="text-xs text-success">{job.salary} บาท/เดือน</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
