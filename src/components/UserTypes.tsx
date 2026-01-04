import { GraduationCap, Building2, School } from "lucide-react";
import UserTypeCard from "./UserTypeCard";

const UserTypes = () => {
  const userTypes = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Find internship opportunities and develop skills",
      features: [
        "Create profile and portfolio",
        "Find jobs that suit you",
        "Apply for jobs easily with one click",
        "Track application status"
      ],
      path: "/auth?role=student",
      gradient: "gradient-primary"
    },
    {
      icon: Building2,
      title: "Companies",
      description: "Find talented people to join your team",
      features: [
        "Post job openings for free",
        "Find candidates that match",
        "Manage applications efficiently",
        "Access high-quality students"
      ],
      path: "/auth?role=company",
      gradient: "gradient-accent"
    },
    {
      icon: School,
      title: "Universities",
      description: "Manage and track data",
      features: [
        "Approve and verify companies",
        "Track employment data",
        "View reports and statistics",
        "Communicate with students and companies"
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
            Choose Your User Type
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A platform designed to meet everyone's needs
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
