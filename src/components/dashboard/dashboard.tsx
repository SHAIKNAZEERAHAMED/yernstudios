import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FolderOpen, MessageCircle, Plus, Star } from "lucide-react";
import akariProfile from "@/assets/akari-profile.jpg";

interface User {
  name: string;
  email: string;
  membershipLevel: string;
  profilePicture: string;
}

const mockProjects = [
  {
    id: 1,
    title: "Website for Anime Convention",
    status: "In Progress",
    type: "Web Development",
    progress: 65,
    dueDate: "Feb 15, 2024"
  },
  {
    id: 2,
    title: "Mobile App for Manga Reader", 
    status: "Planning",
    type: "App Development",
    progress: 20,
    dueDate: "Mar 1, 2024"
  }
];

const mockMessages = [
  {
    id: 1,
    from: "Anime Convention Team",
    subject: "Project Update",
    preview: "The wireframes have been completed and are ready for review...",
    time: "2h ago",
    unread: true
  },
  {
    id: 2,
    from: "Manga Reader Team",
    subject: "New Project Inquiry", 
    preview: "We'd like to discuss additional features for the app...",
    time: "5h ago",
    unread: false
  }
];

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('yarn_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary">
              <AvatarImage src={akariProfile} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold gradient-text">{user.name}</h1>
              <Badge className="bg-gradient-to-r from-primary to-accent">
                <Star className="w-3 h-3 mr-1" />
                {user.membershipLevel}
              </Badge>
            </div>
          </div>
          
          <Button className="glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Projects */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <FolderOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Active Projects</h2>
            </div>
            
            <div className="space-y-4">
              {mockProjects.map((project) => (
                <Card key={project.id} className="glass-card p-6 hover:glow transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.type}</p>
                    </div>
                    <Badge 
                      variant={project.status === "In Progress" ? "default" : "secondary"}
                      className={project.status === "In Progress" ? "bg-gradient-to-r from-primary to-accent" : ""}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Due: {project.dueDate}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Messages */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Recent Messages</h2>
            </div>
            
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <Card key={message.id} className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
                  message.unread ? 'border-primary/50 hover:glow' : 'hover:border-primary/30'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{message.from}</h3>
                    <div className="flex items-center gap-2">
                      {message.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-2">{message.subject}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.preview}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};