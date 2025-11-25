import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import JobSearch from "./pages/student/JobSearch";
import Applications from "./pages/student/Applications";
import StudentProfile from "./pages/student/Profile";

// Company Pages
import CompanyDashboard from "./pages/company/Dashboard";
import PostJob from "./pages/company/PostJob";
import Applicants from "./pages/company/Applicants";
import CompanyMessages from "@/pages/company/Messages";

// University Pages
import UniversityDashboard from "./pages/university/Dashboard";
import Approvals from "./pages/university/Approvals";
import Reports from "./pages/university/Reports";
import Announcements from "./pages/university/Announcements";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageCompanies from "./pages/admin/ManageCompanies";
import ManageUniversities from "./pages/admin/ManageUniversities";
import AdminReports from "./pages/admin/Reports";

// Job Details
import JobDetails from "./pages/student/JobDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/jobs" element={<JobSearch />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/jobs/:id" element={<JobDetails />} />
          <Route path="/student/applications" element={<Applications />} />
          
          {/* Company Routes */}
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/post-job" element={<PostJob />} />
          <Route path="/company/applicants" element={<Applicants />} />
          <Route path="/company/messages" element={<CompanyMessages />} />
          
          {/* University Routes */}
          <Route path="/university/dashboard" element={<UniversityDashboard />} />
          <Route path="/university/approvals" element={<Approvals />} />
          <Route path="/university/reports" element={<Reports />} />
          <Route path="/university/announcements" element={<Announcements />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/companies" element={<ManageCompanies />} />
          <Route path="/admin/universities" element={<ManageUniversities />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
