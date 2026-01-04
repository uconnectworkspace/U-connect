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
    { id: 1, company: "Technology A Company", position: "Full-Stack Developer Intern", status: "Under Review", date: "2 days ago" },
    { id: 2, company: "Finance B Company", position: "Data Analyst Intern", status: "Interview Invited", date: "5 days ago" },
    { id: 3, company: "Marketing C Company", position: "Marketing Intern", status: "Accepted", date: "1 week ago" },
  ];

  const recommendedJobs = [
    { id: 1, company: "AI Startup Company", position: "Machine Learning Intern", location: "Bangkok", type: "Part-time" },
    { id: 2, company: "E-commerce Company", position: "Frontend Developer Intern", location: "Rayong", type: "Full-time" },
    { id: 3, company: "Consulting Company", position: "Business Analyst Intern", location: "Remote", type: "Hybrid" },
  ];

  const stats = [
    { label: "Total Applications", value: "12", icon: Briefcase, color: "text-primary" },
    { label: "Awaiting Response", value: "5", icon: BookOpen, color: "text-warning" },
    { label: "Interview Invitations", value: "3", icon: Star, color: "text-success" },
    { label: "New Messages", value: "2", icon: MessageSquare, color: "text-accent" },
  ];

  const promotions = [
    {
      id: 1,
      title: "XYZ Company is Recruiting Student Interns",
      desc: "Full-Stack / Data / Marketing positions — Paid internship with development programs and remote options",
      companyQuery: "xyz"
    },
    {
      id: 2,
      title: "NextGen Company Recruiting AI Students",
      desc: "Machine Learning internship opportunity with real projects and industry mentors",
      companyQuery: "nextgen"
    },
    {
      id: 3,
      title: "Ecom Startup Opens Frontend Internships",
      desc: "Hybrid work with workshops and student benefits",
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
      case "Under Review": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Interview Invited": return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "Accepted": return "bg-green-500/10 text-green-700 dark:text-green-400";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back, Somchai! 👋</h1>
          <p className="text-muted-foreground">Track your progress and find new opportunities</p>

          {/* Promotion Banner -> Carousel */}
          <div className="mt-6">
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500"
                  style={{ width: `${promotions.length * 100}%`, transform: `translateX(-${promoIndex * (100 / promotions.length)}%)` }}
                >
                  {promotions.map((p) => (
                    <div
                      key={p.id}
                      className="flex-shrink-0 px-4" 
                      style={{ width: `${100 / promotions.length}%` }}
                    >
                      {/* responsive heights: small / md / lg */}
                      <Card className="border bg-gradient-to-r from-primary/5 to-secondary/5 h-48 md:h-72 lg:h-96">
                        <CardContent className="h-full flex flex-col items-start justify-between gap-4 p-4 md:p-6 lg:p-8">
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg lg:text-2xl font-semibold leading-tight">{p.title}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-2">{p.desc}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" onClick={() => navigate(`/student/jobs?company=${p.companyQuery}`)}>View Positions</Button>
                            <Button size="sm" variant="outline" onClick={() => navigate(`/student/contact-company/${p.companyQuery}`)}>Contact Company</Button>
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
                    className={`h-2 w-6 rounded-full ${i === promoIndex ? "bg-primary" : "bg-muted/50"}`}
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
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Track your application status</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/student/applications')}>
                  View All
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
                    Recommended Jobs
                  </CardTitle>
                  <CardDescription>Positions matching your profile</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/student/jobs')}>
                    Search
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
                      <Button size="sm">Apply Now</Button>
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
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/student/profile')}>
                <BookOpen className="h-6 w-6" />
                <span>Edit Profile</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/student/jobs')}>
                <Briefcase className="h-6 w-6" />
                <span>Find Jobs</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/student/messages')}>
                <MessageSquare className="h-6 w-6" />
                <span>Messages</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;