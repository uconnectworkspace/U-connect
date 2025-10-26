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
      company: "บริษัท เทคโนโลยี A",
      logo: "🚀",
      position: "Full-Stack Developer Intern",
      status: "pending",
      appliedDate: "15 ม.ค. 2567",
      lastUpdate: "2 วันที่แล้ว",
      messages: 0,
    },
    {
      id: 2,
      company: "บริษัท การเงิน B",
      logo: "💰",
      position: "Data Analyst Intern",
      status: "interview",
      appliedDate: "12 ม.ค. 2567",
      lastUpdate: "5 วันที่แล้ว",
      interviewDate: "25 ม.ค. 2567 เวลา 14:00",
      messages: 3,
    },
    {
      id: 3,
      company: "บริษัท การตลาด C",
      logo: "📱",
      position: "Marketing Intern",
      status: "accepted",
      appliedDate: "8 ม.ค. 2567",
      lastUpdate: "1 สัปดาห์ที่แล้ว",
      startDate: "1 ก.พ. 2567",
      messages: 5,
    },
    {
      id: 4,
      company: "บริษัท AI Startup",
      logo: "🤖",
      position: "Machine Learning Intern",
      status: "rejected",
      appliedDate: "5 ม.ค. 2567",
      lastUpdate: "10 วันที่แล้ว",
      messages: 1,
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "รอการพิจารณา", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" };
      case "interview":
        return { label: "ได้รับเชิญสัมภาษณ์", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" };
      case "accepted":
        return { label: "ตอบรับแล้ว", color: "bg-green-500/10 text-green-700 dark:text-green-400" };
      case "rejected":
        return { label: "ไม่ผ่านการพิจารณา", color: "bg-red-500/10 text-red-700 dark:text-red-400" };
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
                  สมัครเมื่อ {app.appliedDate}
                </span>
                <span>อัพเดทล่าสุด: {app.lastUpdate}</span>
                {app.messages > 0 && (
                  <span className="flex items-center gap-1 text-primary">
                    <MessageSquare className="h-4 w-4" />
                    {app.messages} ข้อความใหม่
                  </span>
                )}
              </div>

              {app.status === "interview" && app.interviewDate && (
                <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                    📅 นัดสัมภาษณ์: {app.interviewDate}
                  </p>
                </div>
              )}

              {app.status === "accepted" && app.startDate && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    🎉 วันเริ่มงาน: {app.startDate}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">ดูรายละเอียด</Button>
                {app.messages > 0 && (
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    ดูข้อความ
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
          <h1 className="text-3xl font-bold mb-2">การสมัครของฉัน</h1>
          <p className="text-muted-foreground">ติดตามสถานะการสมัครงานทั้งหมด</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="all">ทั้งหมด ({applications.length})</TabsTrigger>
            <TabsTrigger value="pending">รอพิจารณา ({filterApplications("pending").length})</TabsTrigger>
            <TabsTrigger value="interview">สัมภาษณ์ ({filterApplications("interview").length})</TabsTrigger>
            <TabsTrigger value="accepted">ตอบรับ ({filterApplications("accepted").length})</TabsTrigger>
            <TabsTrigger value="rejected">ไม่ผ่าน ({filterApplications("rejected").length})</TabsTrigger>
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