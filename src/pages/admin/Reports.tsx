import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, Building2, GraduationCap, Briefcase, Download, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AdminReports = () => {
  const navigate = useNavigate();

  const platformStats = [
    { month: "January", students: 245, companies: 32, universities: 4, placements: 178 },
    { month: "February", students: 298, companies: 38, universities: 5, placements: 215 },
    { month: "March", students: 356, companies: 42, universities: 6, placements: 267 },
    { month: "April", students: 412, companies: 48, universities: 6, placements: 312 },
  ];

  const universityPerformance = [
    { name: "Chulalongkorn University", students: 856, placements: 623, companies: 45, rate: 72.8 },
    { name: "Thammasat University", students: 742, placements: 518, companies: 38, rate: 69.8 },
    { name: "Kasetsart University", students: 689, placements: 467, companies: 34, rate: 67.8 },
    { name: "Mahidol University", students: 534, placements: 389, companies: 28, rate: 72.8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold mb-2">Platform Reports 📊</h1>
          <p className="text-muted-foreground">System-wide overview and usage statistics</p>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select defaultValue="2024">
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  <SelectItem value="chula">Chulalongkorn University</SelectItem>
                  <SelectItem value="tu">Thammasat University</SelectItem>
                  <SelectItem value="ku">Kasetsart University</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="companies">Companies</SelectItem>
                  <SelectItem value="placements">Placements</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overall Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">2,847</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-success">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Companies</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-accent">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Universities</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-warning">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">1,423</p>
                  <p className="text-sm text-muted-foreground">Successful Placements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-purple-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">72.1%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Growth Trends */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>Monthly system usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformStats.map((stat, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-3">{stat.month} 2024</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">New Students</p>
                      <p className="text-2xl font-bold text-primary">{stat.students}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">New Companies</p>
                      <p className="text-2xl font-bold text-success">{stat.companies}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">New Universities</p>
                      <p className="text-2xl font-bold text-accent">{stat.universities}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Successful Placements</p>
                      <p className="text-2xl font-bold text-warning">{stat.placements}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* University Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>University Performance Comparison</CardTitle>
            <CardDescription>Rankings and statistics of partner universities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {universityPerformance.map((uni, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{uni.name}</h4>
                        <div className="grid grid-cols-3 gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{uni.students} students</span>
                          <span>{uni.companies} companies</span>
                          <span>{uni.placements} placements</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-green-600">{uni.rate}%</p>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all" 
                      style={{ width: `${uni.rate}%` }}
                    />
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

export default AdminReports;
