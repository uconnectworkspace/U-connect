import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase, Clock, Building2, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const JobSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const jobs = [
    {
      id: 1,
      company: "บริษัท เทคโนโลยี A",
      logo: "🚀",
      position: "Full-Stack Developer Intern",
      location: "กรุงเทพฯ",
      type: "Full-time",
      salary: "15,000-20,000 บาท",
      tags: ["React", "Node.js", "MongoDB"],
      posted: "2 วันที่แล้ว",
      applicants: 45,
    },
    {
      id: 2,
      company: "บริษัท AI Startup",
      logo: "🤖",
      position: "Machine Learning Intern",
      location: "กรุงเทพฯ",
      type: "Part-time",
      salary: "12,000-18,000 บาท",
      tags: ["Python", "TensorFlow", "Deep Learning"],
      posted: "3 วันที่แล้ว",
      applicants: 32,
    },
    {
      id: 3,
      company: "บริษัท E-commerce",
      logo: "🛒",
      position: "Frontend Developer Intern",
      location: "ระยอง",
      type: "Full-time",
      salary: "14,000-19,000 บาท",
      tags: ["React", "TypeScript", "CSS"],
      posted: "5 วันที่แล้ว",
      applicants: 28,
    },
    {
      id: 4,
      company: "บริษัท Consulting",
      logo: "💼",
      position: "Business Analyst Intern",
      location: "รีโมท",
      type: "Hybrid",
      salary: "13,000-17,000 บาท",
      tags: ["Excel", "SQL", "PowerBI"],
      posted: "1 สัปดาห์ที่แล้ว",
      applicants: 51,
    },
    {
      id: 5,
      company: "บริษัท การเงิน B",
      logo: "💰",
      position: "Data Analyst Intern",
      location: "กรุงเทพฯ",
      type: "Full-time",
      salary: "16,000-22,000 บาท",
      tags: ["Python", "SQL", "Tableau"],
      posted: "3 วันที่แล้ว",
      applicants: 38,
    },
    {
      id: 6,
      company: "บริษัท การตลาด C",
      logo: "📱",
      position: "Digital Marketing Intern",
      location: "เชียงใหม่",
      type: "Full-time",
      salary: "11,000-15,000 บาท",
      tags: ["SEO", "Social Media", "Google Ads"],
      posted: "4 วันที่แล้ว",
      applicants: 42,
    },
  ];

  const toggleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast.success("ยกเลิกบันทึกงานแล้ว");
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success("บันทึกงานแล้ว");
    }
  };

  const handleApply = (position: string) => {
    toast.success(`สมัครตำแหน่ง ${position} เรียบร้อยแล้ว!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ค้นหางานฝึกงาน</h1>
          <p className="text-muted-foreground">พบ {jobs.length} ตำแหน่งงานที่เหมาะกับคุณ</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาตำแหน่งงาน, บริษัท..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="ประเภทงาน" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="fulltime">Full-time</SelectItem>
                  <SelectItem value="parttime">Part-time</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="สถานที่" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกพื้นที่</SelectItem>
                  <SelectItem value="bangkok">กรุงเทพฯ</SelectItem>
                  <SelectItem value="remote">รีโมท</SelectItem>
                  <SelectItem value="other">ต่างจังหวัด</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover-scale">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{job.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.position}</h3>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSaveJob(job.id)}
                      >
                        <Heart className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.posted}
                      </span>
                      <span>💰 {job.salary}</span>
                      <span>👥 {job.applicants} ผู้สมัคร</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => handleApply(job.position)}>
                        สมัครเลย
                      </Button>
                      <Button variant="outline">ดูรายละเอียด</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;