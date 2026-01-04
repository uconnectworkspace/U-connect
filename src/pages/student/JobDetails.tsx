import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, Clock, DollarSign, Users, Briefcase, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const JobDetails = () => {
  const navigate = useNavigate();

  const jobData = {
    title: "Full Stack Developer Intern",
    company: "ABC Technology Company Ltd.",
    location: "Bangkok (WFH Available)",
    type: "Internship",
    salary: "15,000 - 20,000 Baht/month",
    posted: "2 days ago",
    applicants: 45,
    description: "We are looking for an enthusiastic Full Stack Developer Intern who is ready to learn new technologies to join our team. You will work on real projects and gain valuable experience.",
    responsibilities: [
      "Develop and maintain Web Application both Frontend and Backend",
      "Work with Design and Product teams to create new Features",
      "Write Unit Test and Integration Test",
      "Improve Performance and Security of the system",
      "Participate in Code Review and Agile Development Process"
    ],
    requirements: [
      "Currently studying or graduated in Computer Science, Software Engineering or related field",
      "Basic knowledge of HTML, CSS, JavaScript",
      "Experience with React, Node.js, or TypeScript (Preferred)",
      "Problem-solving and teamwork skills",
      "Able to communicate in English at a good level"
    ],
    benefits: [
      "Compensation 15,000 - 20,000 Baht/month",
      "Work 5 days/week (Mon-Fri)",
      "Work from Home 2 days/week available",
      "Complete work equipment (Laptop, Monitor)",
      "Opportunity for full-time position after internship",
      "Friendly startup work environment"
    ],
    companyInfo: {
      name: "ABC Technology Company Ltd.",
      industry: "Technology / Software Development",
      size: "51-200 people",
      website: "www.abctech.com",
      description: "Leading software development company focused on creating technological innovation. We have diverse projects and expert teams."
    }
  };

  const handleApply = () => {
    toast.success("Application successful! The company will review and contact you within 3-5 business days");
    setTimeout(() => navigate('/student/applications'), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/student/jobs')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{jobData.title}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Building2 className="h-4 w-4" />
                      <span>{jobData.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-primary">
                        <MapPin className="h-3 w-3 mr-1" />
                        {jobData.location}
                      </Badge>
                      <Badge variant="outline" className="text-success">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {jobData.type}
                      </Badge>
                      <Badge variant="outline" className="text-warning">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {jobData.salary}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {jobData.posted}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {jobData.applicants} applicants
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-muted-foreground">{jobData.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {jobData.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Qualifications Required</h3>
                  <ul className="space-y-2">
                    {jobData.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Benefits and Compensation</h3>
                  <ul className="space-y-2">
                    {jobData.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{jobData.companyInfo.name}</h3>
                  <p className="text-muted-foreground text-sm">{jobData.companyInfo.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Industry</p>
                    <p className="font-medium">{jobData.companyInfo.industry}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Company Size</p>
                    <p className="font-medium">{jobData.companyInfo.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Website</p>
                    <p className="font-medium text-primary">{jobData.companyInfo.website}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
                <CardDescription>Submit your application now</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" onClick={handleApply}>
                  Apply for this Position
                </Button>
                <Button variant="outline" className="w-full">
                  Save Job
                </Button>
                <div className="text-xs text-muted-foreground text-center">
                  Your profile and resume will be sent to the company
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "Frontend Developer Intern", company: "XYZ Company", salary: "12,000-18,000" },
                  { title: "Backend Developer Intern", company: "DEF Company", salary: "15,000-20,000" },
                  { title: "Mobile Developer Intern", company: "GHI Company", salary: "14,000-19,000" }
                ].map((job, index) => (
                  <div key={index} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">{job.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{job.company}</p>
                    <p className="text-xs text-success">{job.salary} Baht/month</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
