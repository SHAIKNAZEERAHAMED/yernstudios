import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Simulate successful registration
    toast({
      title: "Welcome to YeRN Studios!",
      description: "Your account has been created successfully."
    });
    
    // Store user data in localStorage for demo
    localStorage.setItem('yarn_user', JSON.stringify({
      name: formData.name,
      email: formData.email,
      profilePicture: "/lovable-uploads/bca78104-5a6d-4dca-851d-d9c5b46332fd.png"
    }));
    
    navigate('/dashboard');
  };

  return (
    <AuthLayout 
      title="Sign Up" 
      subtitle="Create your account to get started"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            className="glass-card border-glass-border"
          />
        </div>
        
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
        
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
            className="glass-card border-glass-border"
          />
        </div>
        
        <div className="flex items-center justify-center p-4 border-2 border-dashed border-glass-border rounded-lg cursor-pointer hover:border-primary transition-colors">
          <div className="text-center">
            <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Add Profile Picture</p>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow"
        >
          Sign Up
        </Button>
        
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-primary-glow transition-colors">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};