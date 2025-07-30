import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const services = [
  "Video Editing - Short Form",
  "Video Editing - Medium Form", 
  "Video Editing - Long Form",
  "Web Development - Landing Page",
  "Web Development - Business Website",
  "Web Development - E-commerce",
  "App Development - Simple App",
  "App Development - Feature-Rich App",
  "App Development - Complex App",
  "Other"
];

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours."
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      service: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 cyber-grid">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold gradient-text mb-4">
            Get in touch
          </h1>
          <p className="text-xl text-muted-foreground">
            We're here to help. Reach out to us with any questions or project inquiries.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-2xl neon-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
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
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="glass-card border-glass-border"
              />
            </div>
            
            <div>
              <Label htmlFor="service">Service</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                <SelectTrigger className="glass-card border-glass-border">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="glass-card border-glass-border">
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                className="glass-card border-glass-border resize-none"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow group"
            >
              Send Message
              <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};