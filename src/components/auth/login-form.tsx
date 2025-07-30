import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate successful login
    toast({
      title: "Welcome back!",
      description: "You have been logged in successfully."
    });
    
    // Store user data in localStorage for demo
    localStorage.setItem('yarn_user', JSON.stringify({
      name: "Akari",
      email: formData.email,
      profilePicture: "/lovable-uploads/bca78104-5a6d-4dca-851d-d9c5b46332fd.png",
      membershipLevel: "Premium Member"
    }));
    
    navigate('/dashboard');
  };

  return (
    <AuthLayout 
      title="Welcome back!" 
      subtitle="Enter your email and password to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="glass-card border-glass-border"
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            className="glass-card border-glass-border"
          />
        </div>
        
        <div className="text-right">
          <Link 
            to="/forgot-password" 
            className="text-sm text-primary hover:text-primary-glow transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        
        <Button 
          type="submit" 
          className="w-full glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow"
        >
          Login
        </Button>
        
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:text-primary-glow transition-colors">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};