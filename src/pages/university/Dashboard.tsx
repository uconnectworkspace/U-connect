import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Briefcase, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const UniversityDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Students", value: "1,245", icon: Users, color: "text-primary", trend: "+12%" },
    { label: "Partner Companies", value: "89", icon: Building2, color: "text-success", trend: "+8%" },
    { label: "Open Positions", value: "156", icon: Briefcase, color: "text-warning", trend: "+15%" },
    { label: "Successful Placements", value: "342", icon: TrendingUp, color: "text-accent", trend: "+23%" },
  ];

  const pendingApprovals = [
    { id: 1, company: "ABC Technology Company", type: "Join Request", date: "2 days ago", status: "pending" },
    { id: 2, company: "XYZ Finance Company", type: "Join Request", date: "3 days ago", status: "pending" },
    { id: 3, company: "Innovation Startup Company", type: "Join Request", date: "5 days ago", status: "pending" },
  ];

  const recentActivities = [
    { id: 1, type: "placement", message: "15 students hired this month", time: "1 hour ago", icon: CheckCircle, color: "text-green-600" },
    { id: 2, type: "company", message: "Tech Solutions posted 3 job positions", time: "3 hours ago", icon: Briefcase, color: "text-blue-600" },
    { id: 3, type: "student", message: "45 new students registered this week", time: "1 day ago", icon: Users, color: "text-purple-600" },
    { id: 4, type: "warning", message: "2 job postings pending review", time: "2 days ago", icon: AlertCircle, color: "text-yellow-600" },
  ];

  const topCompanies = [
    { id: 1, name: "Technology A Company", hires: 45, rating: 4.8 },
    { id: 2, name: "Finance B Company", hires: 38, rating: 4.6 },
    { id: 3, name: "Consulting C Company", hires: 32, rating: 4.7 },
    { id: 4, name: "E-commerce D Company", hires: 28, rating: 4.5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">University Dashboard 🏛️</h1>
          <p className="text-muted-foreground">Job matching system management overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-scale">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-warning" />
                    Pending Approvals
                  </CardTitle>
                  <CardDescription>Companies pending review and approval</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/university/approvals')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{approval.company}</h4>
                      <p className="text-sm text-muted-foreground">{approval.type}</p>
                    </div>
                    <Badge variant="outline" className="text-yellow-600">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{approval.date}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>System activities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top Companies */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Partner Companies</CardTitle>
                <CardDescription>Companies hiring the most students</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/university/reports')}>
                View Reports
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={company.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{company.name}</h4>
                      <p className="text-sm text-muted-foreground">{company.hires} hires</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-600">
                      ⭐ {company.rating}
                    </div>
                    <p className="text-xs text-muted-foreground">Average rating</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/university/approvals')}>
                <CheckCircle className="h-6 w-6" />
                <span>Approve Companies</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/university/reports')}>
                <TrendingUp className="h-6 w-6" />
                <span>View Reports</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" onClick={() => navigate('/university/announcements')}>
                <AlertCircle className="h-6 w-6" />
                <span>Create Announcement</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Users className="h-6 w-6" />
                <span>Manage Students</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UniversityDashboard;