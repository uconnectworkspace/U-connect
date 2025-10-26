import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  path: string;
  gradient: string;
}

const UserTypeCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  path,
  gradient 
}: UserTypeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-primary/50">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <CardHeader className="relative">
        <div className="mb-4 inline-flex">
          <div className={`p-3 rounded-xl ${gradient} bg-opacity-10`}>
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="relative space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg 
                  className="h-3 w-3 text-primary" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={() => navigate(path)}
          className="w-full shadow-md group-hover:shadow-primary"
        >
          เริ่มต้นใช้งาน
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserTypeCard;
