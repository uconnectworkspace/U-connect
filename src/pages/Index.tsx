import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UserTypes from "@/components/UserTypes";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import PartnerShowcase from "@/components/PartnerShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <UserTypes />
      <Features />
      <PartnerShowcase />
      <Footer />

    </div>
  );
};

export default Index;
