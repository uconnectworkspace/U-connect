import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Course = { name: string; description: string; grade?: string };

const mockProfile = {
  name: "นางสาว สมหญิง ใจดี",
  email: "student@gmail.com",
  university: "มหาวิทยาลัยตัวอย่าง",
  major: "วิทยาการคอมพิวเตอร์",
  year: "ปี 3",
  gpa: "3.50",
  expectedGraduation: "มิ.ย. 2026",
  courses: [
    { name: "Data Structures", description: "พื้นฐานโครงสร้างข้อมูล เช่น lists, trees และ graphs", grade: "A" },
    { name: "Algorithms", description: "อัลกอริธึมการค้นหาและการเรียงลำดับ, complexity", grade: "A-" },
    { name: "Database Systems", description: "ออกแบบฐานข้อมูลและการใช้งาน SQL", grade: "B+" },
  ] as Course[],
  skills: ["React", "TypeScript", "Tailwind", "SQL"],
  stats: {
    applications: 12,
    interviews: 4,
    offers: 1,
  },
  cv: null,
};

import { toast } from "sonner";

const STORAGE_KEY = "student_profile_mock";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedProfile, setSavedProfile] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // merge with defaults so older saved objects don't miss newer fields
        return { ...mockProfile, ...parsed };
      }
      return mockProfile;
    } catch {
      return mockProfile;
    }
  });

  // editable fields
  const [name, setName] = useState(savedProfile.name);
  const [email, setEmail] = useState(savedProfile.email);
  const [university, setUniversity] = useState(savedProfile.university);
  const [major, setMajor] = useState(savedProfile.major);
  const [backup, setBackup] = useState<any>(null);
  const [gpa, setGpa] = useState(savedProfile.gpa || "");
  const [expectedGraduation, setExpectedGraduation] = useState(savedProfile.expectedGraduation || "");
  const [courses, setCourses] = useState<Course[]>((savedProfile.courses as Course[]) || []);
  const [cv, setCv] = useState<{ name: string; dataUrl: string } | null>(savedProfile.cv || null);

  // keep inputs in sync when savedProfile changes (e.g., on load)
  useEffect(() => {
    setName(savedProfile.name);
    setEmail(savedProfile.email);
    setUniversity(savedProfile.university);
    setMajor(savedProfile.major);
    setGpa(savedProfile.gpa || "");
    setExpectedGraduation(savedProfile.expectedGraduation || "");
    setCourses(((savedProfile.courses as Course[]) && (savedProfile.courses as Course[]).length > 0)
      ? (savedProfile.courses as Course[])
      : mockProfile.courses);
    setCv(savedProfile.cv || null);
  }, [savedProfile]);

  // CV upload handler
  const handleCvUpload = (file?: File) => {
    if (!file) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      toast.error("รองรับไฟล์ .pdf, .doc, .docx เท่านั้น");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      const newCv = { name: file.name, dataUrl };
      setCv(newCv);
      // persist
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const cur = raw ? JSON.parse(raw) : {};
        cur.cv = newCv;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cur));
      } catch {}
      toast.success("อัปโหลด CV เรียบร้อย");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCv = () => {
    setCv(null);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const cur = raw ? JSON.parse(raw) : {};
      delete cur.cv;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cur));
    } catch {}
    toast.success("ลบ CV แล้ว");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column: avatar + stats */}
          <div>
            <Card className="pt-6 mb-6">
              <CardContent className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-28 w-28">
                  <AvatarFallback>
                    <span className="text-3xl">{name.split(" ")[0].slice(0,1)}</span>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-semibold">{name}</div>
                  <div className="text-sm text-muted-foreground">{email}</div>
                </div>
                <div className="flex gap-4 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                      onClick={() => {
                      // start editing and keep a backup to allow cancel
                      setBackup({ name, email, university, major, gpa, expectedGraduation, courses, cv });
                      setIsEditing(true);
                    }}
                  >
                    แก้ไขโปรไฟล์
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>สถิติการสมัคร</CardTitle>
                <CardDescription>ภาพรวมการหางานของคุณ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{mockProfile.stats.applications}</div>
                    <div className="text-sm text-muted-foreground">สมัครงาน</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{mockProfile.stats.interviews}</div>
                    <div className="text-sm text-muted-foreground">สัมภาษณ์</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{mockProfile.stats.offers}</div>
                    <div className="text-sm text-muted-foreground">ข้อเสนอ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: main info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลส่วนตัว</CardTitle>
                <CardDescription>รายละเอียดโปรไฟล์นักศึกษา (mock)</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsEditing(false);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="email">อีเมล</Label>
                      <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="university">มหาวิทยาลัย</Label>
                      <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="major">สาขา</Label>
                      <Input id="major" value={major} onChange={(e) => setMajor(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="gpa">GPA</Label>
                      <Input id="gpa" value={gpa} onChange={(e) => setGpa(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="expected">คาดว่าจะจบ</Label>
                      <Input id="expected" value={expectedGraduation} onChange={(e) => setExpectedGraduation(e.target.value)} readOnly={!isEditing} />
                    </div>
                  </div>

                    <div className="mt-4 flex items-center gap-4">
                      {isEditing ? (
                        <>
                          <Button
                            type="submit"
                            onClick={() => {
                              // save
                              const updated = { name, email, university, major, gpa, expectedGraduation, courses, cv };
                              setSavedProfile((_) => {
                                try {
                                  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                                } catch {}
                                return updated as any;
                              });
                              setIsEditing(false);
                              toast.success("บันทึกโปรไฟล์เรียบร้อย");
                            }}
                          >
                            บันทึก
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              // restore from backup
                              if (backup) {
                                setName(backup.name);
                                setEmail(backup.email);
                                setUniversity(backup.university);
                                setMajor(backup.major);
                                setGpa(backup.gpa || "");
                                setExpectedGraduation(backup.expectedGraduation || "");
                                setCourses(backup.courses || []);
                                setCv(backup.cv || null);
                              }
                              setIsEditing(false);
                            }}
                          >
                            ยกเลิก
                          </Button>
                        </>
                      ) : (
                        <div className="text-sm text-muted-foreground">คลิก "แก้ไขโปรไฟล์" เพื่อแก้ไขข้อมูล</div>
                      )}
                    </div>
                </form>

                <div>
                  <h3 className="text-lg font-semibold mb-2">ทักษะ</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.skills.map((s) => (
                      <div key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">รายละเอียดรายวิชา</h3>
                  <div className="space-y-3">
                    {courses.length === 0 ? (
                      <div className="text-sm text-muted-foreground">ไม่มีข้อมูลรายวิชา</div>
                    ) : (
                      courses.map((c, idx) => (
                        <div key={idx} className="p-3 border rounded-md">
                          <div className="flex items-baseline justify-between">
                            <div className="font-medium text-base">{c.name}</div>
                            <div className="text-sm text-muted-foreground">เกรด: <span className="font-semibold text-primary">{c.grade ?? '-'}</span></div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{c.description}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">อัปโหลด CV / Resume</h3>
                  <div className="flex items-center gap-4">
                    <input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const f = e.target.files && e.target.files[0];
                        if (f) handleCvUpload(f);
                        // reset input so same file can be re-uploaded if needed
                        e.currentTarget.value = "";
                      }}
                    />
                    {cv ? (
                      <div className="flex items-center gap-2">
                        <a href={cv.dataUrl} target="_blank" rel="noreferrer" className="text-primary underline">
                          เปิด / ดาวน์โหลด ({cv.name})
                        </a>
                        <Button variant="outline" size="sm" onClick={handleRemoveCv}>ลบ</Button>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">ยังไม่มีไฟล์ CV</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
