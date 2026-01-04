import { Sparkles, Shield, Zap, Users, LineChart, MessageSquare } from "lucide-react";

const Features = () => {
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
  );
};

export default Features;
