import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";

type Course = { name: string; description: string; grade?: string };

const mockProfile = {
  name: "Ms. Somying Jaidee",
  email: "student@gmail.com",
  university: "Example University",
  major: "Computer Science",
  year: "Year 3",
  gpa: "3.50",
  expectedGraduation: "Jun 2026",
  courses: [
    { name: "Data Structures", description: "Fundamentals of data structures such as lists, trees and graphs", grade: "A" },
    { name: "Algorithms", description: "Search and sorting algorithms, complexity", grade: "A-" },
    { name: "Database Systems", description: "Database design and SQL usage", grade: "B+" },
  ] as Course[],
  skills: ["React", "TypeScript", "Tailwind", "SQL"],
  stats: {
    applications: 12,
    interviews: 4,
    offers: 1,
  },
  cv: null,
  // indicate this profile has been verified by the university
  verified: true,
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
      toast.error("Only .pdf, .doc, .docx files are supported");
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
      toast.success("CV uploaded successfully");
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
    toast.success("CV deleted");
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
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-semibold">{name}</div>
                    {/* show verified badge when profile (or savedProfile) indicates verification */}
                    {/** savedProfile is used to drive inputs; use savedProfile if available — savedProfile merged with mockProfile on load */}
                    {/** access savedProfile from state — fallback to mockProfile if needed */}
                    {/** (we already keep savedProfile in state; this markup assumes it's in scope) */}
                    {/** to avoid repeating large code, ensure savedProfile.verified exists — mockProfile sets it true by default */ }
                    {/** if you prefer to check `cv` or another field, replace condition accordingly */ }
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    {/** show badge */ savedProfile?.verified ? (
                      <Badge className="flex items-center gap-1 bg-green-100 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        Verified by University
                      </Badge>
                    ) : null}
                  </div>
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
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Stats</CardTitle>
                <CardDescription>Overview of your job search</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{mockProfile.stats.applications}</div>
                    <div className="text-sm text-muted-foreground">Applied</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{mockProfile.stats.interviews}</div>
                    <div className="text-sm text-muted-foreground">Interviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{mockProfile.stats.offers}</div>
                    <div className="text-sm text-muted-foreground">Offers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: main info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Student profile details (mock)</CardDescription>
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
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="university">University</Label>
                      <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="major">Major</Label>
                      <Input id="major" value={major} onChange={(e) => setMajor(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="gpa">GPA</Label>
                      <Input id="gpa" value={gpa} onChange={(e) => setGpa(e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="expected">Expected Graduation</Label>
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
                              toast.success("Profile saved successfully");
                            }}
                          >
                            Save
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
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <div className="text-sm text-muted-foreground">Click "Edit Profile" to modify information</div>
                      )}
                    </div>
                </form>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.skills.map((s) => (
                      <div key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Course Details</h3>
                  <div className="space-y-3">
                    {courses.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No course information</div>
                    ) : (
                      courses.map((c, idx) => (
                        <div key={idx} className="p-3 border rounded-md">
                          <div className="flex items-baseline justify-between">
                            <div className="font-medium text-base">{c.name}</div>
                            <div className="text-sm text-muted-foreground">Grade: <span className="font-semibold text-primary">{c.grade ?? '-'}</span></div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{c.description}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Upload CV / Resume</h3>
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
                          Open / Download ({cv.name})
                        </a>
                        <Button variant="outline" size="sm" onClick={handleRemoveCv}>Delete</Button>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">No CV file uploaded</div>
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
