import { Sparkles, Shield, Zap, Users, LineChart, MessageSquare, Building2, GraduationCap, Briefcase, TrendingUp } from "lucide-react";

const Features = () => {
  const achievements = [
    {
      icon: TrendingUp,
      value: "Top 5",
      label: "Global Venture Playbook",
      subtitle: "CEDT & SEA Bridge"
    },
    {
      icon: Building2,
      value: "4",
      label: "Countries",
      subtitle: "International reach"
    },
    {
      icon: GraduationCap,
      value: "12",
      label: "Universities",
      subtitle: "Partner institutions"
    },
    {
      icon: Users,
      value: "1000+",
      label: "Students",
      subtitle: "Active users"
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Smart Matching",
      description: "AI system helps match students with the most suitable companies"
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "All data is verified and kept secure"
    },
    {
      icon: Zap,
      title: "Fast",
      description: "Apply for jobs and manage applications quickly and easily"
    },
    {
      icon: Users,
      title: "Wide Network",
      description: "Connect with companies and students from across the country"
    },
    {
      icon: LineChart,
      title: "Data Analytics",
      description: "Real-time reports and statistics for universities"
    },
    {
      icon: MessageSquare,
      title: "Easy Communication",
      description: "Chat and coordinate directly within the same system"
    }
  ];

  return (
    <>
      {/* What We Have Done So Far Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">
              What We Have Done So Far
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our achievements and impact in numbers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={index}
                  className="group p-8 rounded-xl border-2 border-border bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 inline-flex p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold mb-2 text-primary">{achievement.value}</div>
                  <p className="text-muted-foreground font-medium">{achievement.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{achievement.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Why Choose Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete tools for the best experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;