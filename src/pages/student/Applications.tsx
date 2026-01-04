import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Calendar, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";

const Applications = () => {
  const applications = [
    {
      id: 1,
      company: "Technology Company A",
      logo: "🚀",
      position: "Full-Stack Developer Intern",
      status: "pending",
      appliedDate: "Jan 15, 2024",
      lastUpdate: "2 days ago",
      messages: 0,
    },
    {
      id: 2,
      company: "Financial Company B",
      logo: "💰",
      position: "Data Analyst Intern",
      status: "interview",
      appliedDate: "Jan 12, 2024",
      lastUpdate: "5 days ago",
      interviewDate: "Jan 25, 2024 at 14:00",
      messages: 3,
    },
    {
      id: 3,
      company: "Marketing Company C",
      logo: "📱",
      position: "Marketing Intern",
      status: "accepted",
      appliedDate: "Jan 8, 2024",
      lastUpdate: "1 week ago",
      startDate: "Feb 1, 2024",
      messages: 5,
    },
    {
      id: 4,
      company: "AI Startup",
      logo: "🤖",
      position: "Machine Learning Intern",
      status: "rejected",
      appliedDate: "Jan 5, 2024",
      lastUpdate: "10 days ago",
      messages: 1,
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Under Review", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" };
      case "interview":
        return { label: "Interview Invited", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" };
      case "accepted":
        return { label: "Accepted", color: "bg-green-500/10 text-green-700 dark:text-green-400" };
      case "rejected":
        return { label: "Not Selected", color: "bg-red-500/10 text-red-700 dark:text-red-400" };
      default:
        return { label: status, color: "bg-muted" };
    }
  };

  const filterApplications = (status?: string) => {
    if (!status) return applications;
    return applications.filter(app => app.status === status);
  };

  const ApplicationCard = ({ app }: { app: typeof applications[0] }) => {
    const statusInfo = getStatusInfo(app.status);

    return (
      <Card className="hover-scale">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{app.logo}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{app.position}</h3>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {app.company}
                  </p>
                </div>
                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
              </div>

              <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Applied on {app.appliedDate}
                </span>
                <span>Last update: {app.lastUpdate}</span>
                {app.messages > 0 && (
                  <span className="flex items-center gap-1 text-primary">
                    <MessageSquare className="h-4 w-4" />
                    {app.messages} new messages
                  </span>
                )}
              </div>

              {app.status === "interview" && app.interviewDate && (
                <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                    📅 Interview scheduled: {app.interviewDate}
                  </p>
                </div>
              )}

              {app.status === "accepted" && app.startDate && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    🎉 Start date: {app.startDate}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Details</Button>
                {app.messages > 0 && (
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Messages
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track all job application statuses</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
            <TabsTrigger value="pending">Under Review ({filterApplications("pending").length})</TabsTrigger>
            <TabsTrigger value="interview">Interview ({filterApplications("interview").length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({filterApplications("accepted").length})</TabsTrigger>
            <TabsTrigger value="rejected">Not Selected ({filterApplications("rejected").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {applications.map(app => <ApplicationCard key={app.id} app={app} />)}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterApplications("pending").map(app => <ApplicationCard key={app.id} app={app} />)}
          </TabsContent>

          <TabsContent value="interview" className="space-y-4">
            {filterApplications("interview").map(app => <ApplicationCard key={app.id} app={app} />)}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {filterApplications("accepted").map(app => <ApplicationCard key={app.id} app={app} />)}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {filterApplications("rejected").map(app => <ApplicationCard key={app.id} app={app} />)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Applications;