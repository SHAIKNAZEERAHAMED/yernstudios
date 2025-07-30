import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAILS = [
  "nazeershiek098@gmail.com",
  "yernstudios@gmail.com"
];

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!ADMIN_EMAILS.includes(formData.email)) {
        toast({
          title: "Access Denied",
          description: "This login is for admins only.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      toast({
        title: "Welcome, Admin!",
        description: "You have been logged in as admin."
      });
      navigate("/dashboard");
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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md glass-card p-8">
        <h1 className="text-2xl font-bold mb-4 text-center gradient-text">Admin Login</h1>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your admin email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full glow bg-gradient-to-r from-primary to-accent">
          {isLoading ? "Signing in..." : "Login as Admin"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
