import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role");
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getRoleTitle = () => {
    switch (role) {
      case "student": return "นักศึกษา";
      case "company": return "บริษัท";
      case "university": return "มหาวิทยาลัย";
      default: return "ผู้ใช้งาน";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple mock auth
    setTimeout(() => {
      const normalized = email.trim().toLowerCase();
      const validPassword = password === "1234678";

      if (!validPassword) {
        toast.error("รหัสผ่านไม่ถูกต้อง (ใช้: 1234678)");
        setIsLoading(false);
        return;
      }

      if (normalized === "student@gmail.com") {
        toast.success("เข้าสู่ระบบในฐานะนักศึกษา");
        navigate("/student/dashboard");
      } else if (normalized === "uni@gmail.com" || normalized === "university@gmail.com") {
        toast.success("เข้าสู่ระบบในฐานะมหาวิทยาลัย");
        navigate("/university/dashboard");
      } else if (normalized === "comp@gmail.com" || normalized === "company@gmail.com") {
        toast.success("เข้าสู่ระบบในฐานะบริษัท");
        navigate("/company/dashboard");
      } else {
        toast.error("ไม่พบบัญชีผู้ใช้ กรุณาใช้ student@gmail.com, uni@gmail.com หรือ comp@gmail.com");
      }

      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับหน้าแรก
        </Button>

        <Card className="border-2">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-primary">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl">ยินดีต้อนรับ</CardTitle>
              <CardDescription className="text-base mt-2">
                เข้าสู่ระบบสำหรับ{getRoleTitle()}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">เข้าสู่ระบบ</TabsTrigger>
                <TabsTrigger value="register">ลงทะเบียน</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">อีเมล</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">รหัสผ่าน</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* Mock credentials helper */}
                  <div className="text-sm text-muted-foreground">
                    ทดสอบบัญชี: student@gmail.com, uni@gmail.com, comp@gmail.com — รหัสผ่าน: 1234678
                  </div>
                  <Button
                    type="submit"
                    className="w-full shadow-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="กรุณากรอกชื่อ-นามสกุล"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">อีเมล</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">รหัสผ่าน</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">ยืนยันรหัสผ่าน</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full shadow-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
