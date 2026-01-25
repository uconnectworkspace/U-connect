import Profile from "@/assets/profile.png"
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine user role from current path
  const isStudent = location.pathname.startsWith('/student');
  const isCompany = location.pathname.startsWith('/company');
  const isUniversity = location.pathname.startsWith('/university');
  const isAdmin = location.pathname.startsWith('/admin');

  const getNavLinks = () => {
    if (isStudent) {
      return [
        { label: 'Dashboard', path: '/student/dashboard' },
        { label: 'Find Jobs', path: '/student/jobs' },
        { label: 'My Applications', path: '/student/applications' },
      ];
    }
    if (isCompany) {
      return [
        { label: 'Dashboard', path: '/company/dashboard' },
        { label: 'Post Job', path: '/company/post-job' },
        { label: 'Manage Applicants', path: '/company/applicants' },
        { label: 'Messages', path: '/company/messages' },
      ];
    }
    if (isUniversity) {
      return [
        { label: 'Dashboard', path: '/university/dashboard' },
        { label: 'Approve Companies', path: '/university/approvals' },
        { label: 'Reports', path: '/university/reports' },
        { label: 'Announcements', path: '/university/announcements' },
      ];
    }
    if (isAdmin) {
      return [
        { label: 'Dashboard', path: '/admin/dashboard' },
        { label: 'Students', path: '/admin/students' },
        { label: 'Companies', path: '/admin/companies' },
        { label: 'Universities', path: '/admin/universities' },
        { label: 'Reports', path: '/admin/reports' },
      ];
    }
    return [];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              
              

              {/* Title: grow to fill remaining nav space */}
              <div className="h-10 flex-1  flex items-center justify-start px-3">
                <img
                  src="/Title.png"
                  alt="Title"
                  className="h-full w-full max-w-[220px] object-cover block"
                  style={{ clipPath: 'inset(8% 0 5% 0)' }}
                />
              </div>
            
            </div>

            {navLinks.length > 0 && (
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  {navLinks.map((link) => (
                    <NavigationMenuItem key={link.path}>
                      <NavigationMenuLink
                        className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                          location.pathname === link.path
                            ? 'bg-muted font-medium'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => navigate(link.path)}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

           {(isStudent || isCompany || isUniversity || isAdmin) && (
            <div className="flex flex-row h-full items-center gap-5">
             
              <div className="h-full flex items-center gap-5">
                <img src={Profile} alt="" className="h-[80%]"/>
              Welcome, Student
              </div>
           
              
              </div>
            )}

          

          {/* <div className="flex items-center gap-4">
            {!isStudent && !isCompany && !isUniversity && !isAdmin && (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button onClick={() => navigate("/auth")}>
                  Sign Up
                </Button>
              </>
            )}
            {(isStudent || isCompany || isUniversity || isAdmin) && (
              <Button variant="outline" onClick={() => navigate("/")}>
                Sign Out
              </Button>
            )}
          </div> */}
{isCompany && (
          <div className="hidden md:flex items-center gap-2">
            
              <Link to="/company/messages" className="text-sm hover:underline">
                Contact University
              </Link>
            
          </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
