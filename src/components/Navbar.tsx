import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl">InternMatch</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              เข้าสู่ระบบ
            </Button>
            <Button onClick={() => navigate("/auth")}>
              ลงทะเบียน
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
