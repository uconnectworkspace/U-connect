import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Users, Building2, Globe, Send, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Announcements = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");

  const recentAnnouncements = [
    { id: 1, title: "เปิดรับสมัครงานฤดูร้อน 2024", audience: "นักศึกษา", date: "2 วันที่แล้ว", views: 1234 },
    { id: 2, title: "กิจกรรม Job Fair ประจำเดือนมีนาคม", audience: "ทั้งหมด", date: "5 วันที่แล้ว", views: 2456 },
    { id: 3, title: "นโยบายใหม่สำหรับบริษัทพาร์ทเนอร์", audience: "บริษัท", date: "1 สัปดาห์ที่แล้ว", views: 567 },
  ];

  const handleSendAnnouncement = () => {
    if (!title || !message) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    toast.success("ส่งประกาศเรียบร้อยแล้ว");
    setTitle("");
    setMessage("");
    setAudience("all");
  };

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case "นักศึกษา":
        return <Badge variant="outline" className="text-primary">นักศึกษา</Badge>;
      case "บริษัท":
        return <Badge variant="outline" className="text-success">บริษัท</Badge>;
      case "ทั้งหมด":
        return <Badge variant="outline" className="text-accent">ทั้งหมด</Badge>;
      default:
        return <Badge variant="outline">{audience}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/university/dashboard')} className="mb-4">
            ← กลับไปแดชบอร์ด
          </Button>
          <h1 className="text-3xl font-bold mb-2">สร้างประกาศ 📢</h1>
          <p className="text-muted-foreground">ส่งประกาศและข้อมูลสำคัญถึงนักศึกษาและบริษัทพาร์ทเนอร์</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Create Announcement Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                สร้างประกาศใหม่
              </CardTitle>
              <CardDescription>เขียนประกาศและเลือกกลุ่มเป้าหมาย</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">หัวข้อประกาศ</Label>
                <Input
                  id="title"
                  placeholder="กรอกหัวข้อประกาศ..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">กลุ่มเป้าหมาย</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกกลุ่มเป้าหมาย" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>ทั้งหมด (นักศึกษาและบริษัท)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="students">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>นักศึกษาเท่านั้น</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="companies">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>บริษัทเท่านั้น</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">เนื้อหาประกาศ</Label>
                <Textarea
                  id="message"
                  placeholder="เขียนเนื้อหาประกาศ..."
                  className="min-h-[200px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSendAnnouncement} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  ส่งประกาศ
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  ดูตัวอย่าง
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">สถิติการส่งประกาศ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-3xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">ประกาศทั้งหมดเดือนนี้</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4,567</p>
                  <p className="text-sm text-muted-foreground">การเปิดอ่านรวม</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">89%</p>
                  <p className="text-sm text-muted-foreground">อัตราการเปิดอ่าน</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">จำนวนผู้รับ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">นักศึกษา</span>
                  </div>
                  <span className="font-semibold">1,245</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-success" />
                    <span className="text-sm">บริษัท</span>
                  </div>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">รวมทั้งหมด</span>
                  </div>
                  <span className="font-bold">1,334</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>ประกาศล่าสุด</CardTitle>
            <CardDescription>ประกาศที่ส่งไปแล้ว</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        {getAudienceBadge(announcement.audience)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>ส่งเมื่อ {announcement.date}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {announcement.views.toLocaleString()} ครั้ง
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
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

export default Announcements;
