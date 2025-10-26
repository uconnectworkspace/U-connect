import { GraduationCap, Building2, School } from "lucide-react";
import UserTypeCard from "./UserTypeCard";

const UserTypes = () => {
  const userTypes = [
    {
      icon: GraduationCap,
      title: "นักศึกษา",
      description: "ค้นหาโอกาสฝึกงานและพัฒนาทักษะ",
      features: [
        "สร้างโปรไฟล์และพอร์ตโฟลิโอ",
        "ค้นหางานที่เหมาะกับคุณ",
        "สมัครงานได้ง่ายๆ ในคลิกเดียว",
        "ติดตามสถานะการสมัคร"
      ],
      path: "/auth?role=student",
      gradient: "gradient-primary"
    },
    {
      icon: Building2,
      title: "บริษัท",
      description: "หาคนเก่งเข้าร่วมทีมของคุณ",
      features: [
        "ประกาศตำแหน่งงานฟรี",
        "ค้นหาผู้สมัครที่ตรงใจ",
        "จัดการใบสมัครอย่างมีประสิทธิภาพ",
        "เข้าถึงนักศึกษาคุณภาพสูง"
      ],
      path: "/auth?role=company",
      gradient: "gradient-accent"
    },
    {
      icon: School,
      title: "มหาวิทยาลัย",
      description: "จัดการและติดตามข้อมูล",
      features: [
        "อนุมัติและตรวจสอบบริษัท",
        "ติดตามข้อมูลการจ้างงาน",
        "ดูรายงานและสถิติ",
        "สื่อสารกับนักศึกษาและบริษัท"
      ],
      path: "/auth?role=university",
      gradient: "gradient-primary"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            เลือกประเภทผู้ใช้งานของคุณ
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            แพลตฟอร์มที่ออกแบบมาเพื่อตอบโจทย์ทุกฝ่าย
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {userTypes.map((type, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <UserTypeCard {...type} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
