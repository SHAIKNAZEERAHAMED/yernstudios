import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroCharacter from "@/assets/hero-character.jpg";

export const WelcomeScreen = () => {
  return (
    <div className="min-h-screen relative overflow-hidden cyber-grid">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-12 py-20">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Welcome to{" "}
            <span className="gradient-text">YeRN Studios</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Your ultimate partner in next-gen video editing and digital development.{" "}
            <span className="text-accent">Let's craft your story.</span>
          </p>
          
          <Link to="/login">
            <Button 
              size="lg" 
              className="glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow text-lg px-8 py-6 rounded-full group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        {/* Right Content - Character Illustration */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-3xl blur-3xl anime-bounce" />
            <img 
              src={heroCharacter} 
              alt="YeRN Studios Character" 
              className="relative z-10 w-full h-auto rounded-3xl shadow-cyber"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full opacity-60 anime-bounce" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-secondary rounded-full opacity-80 anime-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent rounded-full opacity-70 anime-bounce" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};