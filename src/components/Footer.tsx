import { Briefcase, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
             
               <div className="h-10 flex-1  flex items-center justify-start px-3">
                <img
                  src="/Title.png"
                  alt="Title"
                  className="h-full w-full max-w-[220px] object-cover block ml-[-20px]"
                  style={{ clipPath: 'inset(8% 0 5% 0)' }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Job matching platform for students and companies 
              trusted by leading universities
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Find Jobs</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Create Profile</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Tips</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Companies</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Post Jobs</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Find Candidates</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Plans & Pricing</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@U-Connect.th
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                02-123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Bangkok, Thailand
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 U-Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
