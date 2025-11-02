import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

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
        { label: 'แดชบอร์ด', path: '/student/dashboard' },
        { label: 'ค้นหางาน', path: '/student/jobs' },
        { label: 'การสมัครของฉัน', path: '/student/applications' },
      ];
    }
    if (isCompany) {
      return [
        { label: 'แดชบอร์ด', path: '/company/dashboard' },
        { label: 'ประกาศงาน', path: '/company/post-job' },
        { label: 'จัดการผู้สมัคร', path: '/company/applicants' },
      ];
    }
    if (isUniversity) {
      return [
        { label: 'แดชบอร์ด', path: '/university/dashboard' },
        { label: 'อนุมัติบริษัท', path: '/university/approvals' },
        { label: 'รายงาน', path: '/university/reports' },
        { label: 'ประกาศ', path: '/university/announcements' },
      ];
    }
    if (isAdmin) {
      return [
        { label: 'แดชบอร์ด', path: '/admin/dashboard' },
        { label: 'นักศึกษา', path: '/admin/students' },
        { label: 'บริษัท', path: '/admin/companies' },
        { label: 'มหาวิทยาลัย', path: '/admin/universities' },
        { label: 'รายงาน', path: '/admin/reports' },
      ];
    }
    return [];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

          <div className="flex items-center gap-4">
            {!isStudent && !isCompany && !isUniversity && !isAdmin && (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")}>
                  เข้าสู่ระบบ
                </Button>
                <Button onClick={() => navigate("/auth")}>
                  ลงทะเบียน
                </Button>
              </>
            )}
            {(isStudent || isCompany || isUniversity || isAdmin) && (
              <Button variant="outline" onClick={() => navigate("/")}>
                ออกจากระบบ
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
