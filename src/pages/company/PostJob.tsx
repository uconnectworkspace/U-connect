import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Briefcase, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const PostJob = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast.success("ประกาศงานสำเร็จ!");
      setIsLoading(false);
      navigate('/company/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">ประกาศตำแหน่งงานใหม่</h1>
          </div>
          <p className="text-muted-foreground">กรอกรายละเอียดตำแหน่งงานที่ต้องการรับสมัคร</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลพื้นฐาน</CardTitle>
                <CardDescription>รายละเอียดหลักของตำแหน่งงาน</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="position">ชื่อตำแหน่ง *</Label>
                  <Input
                    id="position"
                    placeholder="เช่น Full-Stack Developer Intern"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">ประเภทงาน *</Label>
                    <Select defaultValue="fulltime">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fulltime">Full-time</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">สถานที่ *</Label>
                    <Input
                      id="location"
                      placeholder="เช่น กรุงเทพฯ, รีโมท"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min">เงินเดือน (ขั้นต่ำ) *</Label>
                    <Input
                      id="salary-min"
                      type="number"
                      placeholder="15000"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary-max">เงินเดือน (สูงสุด) *</Label>
                    <Input
                      id="salary-max"
                      type="number"
                      placeholder="20000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="positions">จำนวนที่รับ *</Label>
                  <Input
                    id="positions"
                    type="number"
                    placeholder="2"
                    min="1"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>รายละเอียดงาน</CardTitle>
                <CardDescription>อธิบายหน้าที่และความรับผิดชอบ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">รายละเอียดงาน *</Label>
                  <Textarea
                    id="description"
                    placeholder="อธิบายหน้าที่ความรับผิดชอบหลักของตำแหน่งนี้..."
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">คุณสมบัติผู้สมัคร *</Label>
                  <Textarea
                    id="requirements"
                    placeholder="ระบุคุณสมบัติที่ต้องการ เช่น การศึกษา, ประสบการณ์..."
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">สวัสดิการและผลประโยชน์</Label>
                  <Textarea
                    id="benefits"
                    placeholder="ระบุสวัสดิการที่บริษัทให้..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>ทักษะที่ต้องการ</CardTitle>
                <CardDescription>ระบุทักษะหรือเทคโนโลยีที่ต้องการ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="เช่น React, Python, SQL..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill}>เพิ่ม</Button>
                </div>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 shadow-primary"
                disabled={isLoading}
              >
                {isLoading ? "กำลังประกาศงาน..." : "ประกาศงาน"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/company/dashboard')}
              >
                ยกเลิก
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;