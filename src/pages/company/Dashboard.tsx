import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Eye, MessageSquare, TrendingUp, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const CompanyDashboard = () => {
  const navigate = useNavigate();

  const activeJobs = [
    { id: 1, position: "Full-Stack Developer Intern", applicants: 45, views: 234, posted: "2 days ago", status: "active" },
    { id: 2, position: "Data Analyst Intern", applicants: 32, views: 189, posted: "5 days ago", status: "active" },
    { id: 3, position: "Marketing Intern", applicants: 28, views: 156, posted: "1 week ago", status: "active" },
  ];

  const recentApplicants = [
    { id: 1, name: "Somchai Jaidee", position: "Full-Stack Developer Intern", university: "Chulalongkorn University", skills: ["React", "Node.js"], status: "new" },
    { id: 2, name: "Somying Rakrian", position: "Data Analyst Intern", university: "King Mongkut's University of Technology Thonburi", skills: ["Python", "SQL"], status: "reviewed" },
    { id: 3, name: "Wittaya Sangsarn", position: "Marketing Intern", university: "Thammasat University", skills: ["SEO", "Social Media"], status: "shortlisted" },
  ];

  const stats = [
    { label: "Open Positions", value: "3", icon: Briefcase, color: "text-primary" },
    { label: "Total Applicants", value: "105", icon: Users, color: "text-success" },
    { label: "Pending Review", value: "12", icon: Eye, color: "text-warning" },
    { label: "New Messages", value: "5", icon: MessageSquare, color: "text-accent" },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "new":
        return { label: "New", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" };
      case "reviewed":
        return { label: "Reviewed", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" };
      case "shortlisted":
        return { label: "Shortlisted", color: "bg-green-500/10 text-green-700 dark:text-green-400" };
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
            <h1 className="text-3xl font-bold mb-2">Company Dashboard 🏢</h1>
            <p className="text-muted-foreground">Manage job positions and applicants</p>
          </div>
          <Button className="shadow-primary" onClick={() => navigate('/company/post-job')}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
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
                  <CardTitle>Open Positions</CardTitle>
                  <CardDescription>Track job posting performance</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/company/post-job')}>
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold">{job.position}</h4>
                    <Badge variant="outline" className="text-green-600">Open</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {job.applicants} applicants
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {job.views} views
                    </span>
                    <span>{job.posted}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => navigate('/company/applicants')}>
                      View Applicants
                    </Button>
                    <Button size="sm" variant="ghost">Edit</Button>
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
                    Recent Applicants
                  </CardTitle>
                  <CardDescription>New applicants who submitted applications</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/company/applicants')}>
                  View All
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
                    <p className="text-sm text-muted-foreground mb-2">Applied for: {applicant.position}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {applicant.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <Button size="sm">View Profile</Button>
                  </div>
                );
              })}
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
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/company/applicants')}>
                <Users className="h-6 w-6" />
                <span>Manage Applicants</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/company/search')}>
                <Eye className="h-6 w-6" />
                <span>Search Applicants</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/company/messages')}>
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

export default CompanyDashboard;