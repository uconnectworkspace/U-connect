import { GraduationCap, Building2, School, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserShowcase = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const userTypes = [
    {
      icon: GraduationCap,
      title: "For Students",
      subtitle: "Your pathway to career success",
      description: "Discover internship opportunities that match your skills and career goals. Apply with confidence and track your progress every step of the way.",
      previewImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
      gradient: "from-blue-500 to-blue-900"
    },
    {
      icon: Building2,
      title: "For Companies",
      subtitle: "Find the perfect talent",
      description: "Connect with pre-vetted students from top universities. Streamline your hiring process and build your future team.",
      previewImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
      gradient: "from-blue-500 to-blue-900"
    },
    {
      icon: School,
      title: "For Universities",
      subtitle: "Empower your students",
      description: "Monitor student internship placements and outcomes. Generate insights to improve your career services program.",
      previewImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
      gradient: "from-blue-500 to-blue-900"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % userTypes.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, userTypes.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % userTypes.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + userTypes.length) % userTypes.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const isEven = currentSlide % 2 === 0;
  const userType = userTypes[currentSlide];
  const Icon = userType.icon;

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Built For Everyone
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored experiences for students, companies, and universities
          </p>
        </div>

        <div className="relative">
          {/* Main Slider Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ minHeight: '600px' }}>
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 transition-opacity duration-700">
              <img 
                src={userType.previewImage}
                alt={`${userType.title} interface`}
                className="w-full h-full object-cover"
                key={currentSlide}
              />
              {/* Gradient overlay that fades to white */}
              <div className={`absolute inset-0 transition-all duration-700 ${
                isEven 
                  ? 'bg-gradient-to-r from-transparent via-white/80 to-white' 
                  : 'bg-gradient-to-l from-transparent via-white/80 to-white'
              }`} />
            </div>

            {/* Content positioned on the white side */}
            <div className="relative grid lg:grid-cols-2 min-h-[600px]">
              {/* Empty column for image visibility */}
              <div className={!isEven ? 'lg:order-2' : ''} />
              
              {/* Content column */}
              <div className={`flex flex-col justify-center px-12 py-16 space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${userType.gradient} shadow-lg animate-fade-in`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Title */}
                <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    {userType.title}
                  </h3>
                  <p className={`text-xl font-medium bg-gradient-to-r ${userType.gradient} bg-clip-text text-transparent`}>
                    {userType.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-700 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {userType.description}
                </p>

                {/* CTA */}
                <Button 
                  size="lg" 
                  className="text-lg h-14 px-8 shadow-xl w-fit animate-fade-in" 
                  style={{ animationDelay: '0.3s' }}
                  onClick={() => navigate('/auth')}
                >
                  Try Demo
                </Button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-gray-900" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {userTypes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index 
                    ? 'w-12 h-3 bg-primary' 
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default UserShowcase;