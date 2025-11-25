import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, BookOpen, MessageSquare, Star, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const recentApplications = [
    { id: 1, company: "บริษัท เทคโนโลยี A", position: "Full-Stack Developer Intern", status: "รอการพิจารณา", date: "2 วันที่แล้ว" },
    { id: 2, company: "บริษัท การเงิน B", position: "Data Analyst Intern", status: "ได้รับเชิญสัมภาษณ์", date: "5 วันที่แล้ว" },
    { id: 3, company: "บริษัท การตลาด C", position: "Marketing Intern", status: "ตอบรับแล้ว", date: "1 สัปดาห์ที่แล้ว" },
  ];

  const recommendedJobs = [
    { id: 1, company: "บริษัท AI Startup", position: "Machine Learning Intern", location: "กรุงเทพฯ", type: "Part-time" },
    { id: 2, company: "บริษัท E-commerce", position: "Frontend Developer Intern", location: "ระยอง", type: "Full-time" },
    { id: 3, company: "บริษัท Consulting", position: "Business Analyst Intern", location: "รีโมท", type: "Hybrid" },
  ];

  const stats = [
    { label: "การสมัครทั้งหมด", value: "12", icon: Briefcase, color: "text-primary" },
    { label: "รอการตอบรับ", value: "5", icon: BookOpen, color: "text-warning" },
    { label: "ได้รับเชิญสัมภาษณ์", value: "3", icon: Star, color: "text-success" },
    { label: "ข้อความใหม่", value: "2", icon: MessageSquare, color: "text-accent" },
  ];

  const promotions = [
    {
      id: 1,
      title: "บริษัทตัวอย่าง XYZ กำลังรับสมัครนักศึกษาฝึกงาน",
      desc: "ตำแหน่ง Full-Stack / Data / Marketing — ช่วงฝึกงานแบบชำระค่าตอบแทน พร้อมโปรแกรมพัฒนาและรีโมทได้",
      companyQuery: "xyz"
    },
    {
      id: 2,
      title: "บริษัท NextGen รับสมัครนักศึกษา AI",
      desc: "โอกาสฝึกงานด้าน Machine Learning พร้อมโปรเจคจริง และเมนเทอร์จากวงการ",
      companyQuery: "nextgen"
    },
    {
      id: 3,
      title: "สตาร์ทอัพ Ecom เปิดรับฝึกงานด้าน Frontend",
      desc: "งานแบบ Hybrid พร้อม workshop และสวัสดิการสำหรับนักศึกษา",
      companyQuery: "ecom"
    }
  ];

  // Carousel state for promotions
  const [promoIndex, setPromoIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setPromoIndex((p) => (p + 1) % promotions.length);
    }, 5000); // auto-advance every 5s
    return () => clearInterval(timer);
  }, [promotions.length]);

  const prevPromo = () => setPromoIndex((p) => (p - 1 + promotions.length) % promotions.length);
  const nextPromo = () => setPromoIndex((p) => (p + 1) % promotions.length);

  // Ref-based horizontal scroll for recommended jobs
  const jobsRef = useRef<HTMLDivElement | null>(null);
  const scrollJobs = (dir: "left" | "right") => {
    if (!jobsRef.current) return;
    const width = jobsRef.current.clientWidth || 300;
    jobsRef.current.scrollBy({ left: dir === "right" ? width : -width, behavior: "smooth" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "รอการพิจารณา": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "ได้รับเชิญสัมภาษณ์": return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "ตอบรับแล้ว": return "bg-green-500/10 text-green-700 dark:text-green-400";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ยินดีต้อนรับกลับ, สมชาย! 👋</h1>
          <p className="text-muted-foreground">ติดตามความคืบหน้าและค้นหาโอกาสใหม่ๆ</p>

          {/* Promotion Banner -> Carousel */}
          <div className="mt-6">
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 w-full"
                  style={{ width: `${promotions.length * 100}%`, transform: `translateX(-${promoIndex * (100 / promotions.length)}%)` }}
                >
                  {promotions.map((p) => (
                    <div key={p.id} className="min-w-full">
                      <Card className="border bg-gradient-to-r from-primary/5 to-secondary/5 py-[15vh]">
                        <CardContent className="flex flex-col items-start justify-between gap-10">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{p.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button onClick={() => navigate(`/student/jobs?company=${p.companyQuery}`)}>ดูตำแหน่งงาน</Button>
                            <Button variant="outline" onClick={() => navigate(`/student/contact-company/${p.companyQuery}`)}>ติดต่อบริษัท</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prev/Next controls */}
              <button
                type="button"
                aria-label="Previous promotion"
                onClick={prevPromo}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next promotion"
                onClick={nextPromo}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="absolute left-1/2 bottom-3 -translate-x-1/2 flex gap-2">
                {promotions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPromoIndex(i)}
                    className={`h-2 w-8 rounded-full ${i === promoIndex ? "bg-primary" : "bg-muted/50"}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
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
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>การสมัครล่าสุด</CardTitle>
                  <CardDescription>ติดตามสถานะการสมัครของคุณ</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/student/applications')}>
                  ดูทั้งหมด
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{app.position}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{app.company}</p>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{app.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Jobs -> Horizontal scroll with controls */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    งานแนะนำสำหรับคุณ
                  </CardTitle>
                  <CardDescription>ตำแหน่งที่เหมาะกับโปรไฟล์ของคุณ</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/student/jobs')}>
                    ค้นหา
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => scrollJobs('left')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => scrollJobs('right')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div ref={jobsRef} className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="min-w-[260px] flex-shrink-0 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{job.position}</h4>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">📍 {job.location}</span>
                      <Button size="sm">สมัครเลย</Button>
                    </div>
                  </div>
                ))}
              </div>
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
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/student/profile')}>
                <BookOpen className="h-6 w-6" />
                <span>แก้ไขโปรไฟล์</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/student/jobs')}>
                <Briefcase className="h-6 w-6" />
                <span>ค้นหางาน</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/student/messages')}>
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

export default StudentDashboard;