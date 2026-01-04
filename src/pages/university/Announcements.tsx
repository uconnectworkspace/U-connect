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
    { id: 1, title: "Summer 2024 Job Recruitment Open", audience: "Students", date: "2 days ago", views: 1234 },
    { id: 2, title: "March Job Fair Event", audience: "All", date: "5 days ago", views: 2456 },
    { id: 3, title: "New Policy for Partner Companies", audience: "Companies", date: "1 week ago", views: 567 },
  ];

  const handleSendAnnouncement = () => {
    if (!title || !message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Announcement sent successfully");
    setTitle("");
    setMessage("");
    setAudience("all");
  };

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case "Students":
        return <Badge variant="outline" className="text-primary">Students</Badge>;
      case "Companies":
        return <Badge variant="outline" className="text-success">Companies</Badge>;
      case "All":
        return <Badge variant="outline" className="text-accent">All</Badge>;
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
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold mb-2">Create Announcement 📢</h1>
          <p className="text-muted-foreground">Send announcements and important information to students and partner companies</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Create Announcement Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                Create New Announcement
              </CardTitle>
              <CardDescription>Write announcement and select target audience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Announcement Title</Label>
                <Input
                  id="title"
                  placeholder="Enter announcement title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>All (Students and Companies)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="students">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Students Only</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="companies">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>Companies Only</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Announcement Content</Label>
                <Textarea
                  id="message"
                  placeholder="Write announcement content..."
                  className="min-h-[200px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSendAnnouncement} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Announcement Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-3xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Total announcements this month</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4,567</p>
                  <p className="text-sm text-muted-foreground">Total views</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">89%</p>
                  <p className="text-sm text-muted-foreground">Open rate</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recipients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Students</span>
                  </div>
                  <span className="font-semibold">1,245</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-success" />
                    <span className="text-sm">Companies</span>
                  </div>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">Total</span>
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
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Previously sent announcements</CardDescription>
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
                        <span>Sent {announcement.date}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {announcement.views.toLocaleString()} views
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
