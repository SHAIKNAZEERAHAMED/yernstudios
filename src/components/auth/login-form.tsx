import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message && error.message.toLowerCase().includes("email not confirmed")) {
          toast({
            title: "Email Not Confirmed",
            description: "Please check your inbox and confirm your email before logging in. If you didn't receive the email, check your spam folder or request a new confirmation email.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        throw error;
      }

      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully."
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
          className="w-full glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow"
        >
          {isLoading ? "Signing in..." : "Login"}
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