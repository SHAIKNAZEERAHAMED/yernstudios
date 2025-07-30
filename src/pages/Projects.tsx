import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus, Calendar, User } from "lucide-react";

const mockProjects = [
  {
    id: 1,
    title: "Website for Anime Convention",
    description: "A modern website showcasing anime convention events, schedules, and vendor information.",
    status: "In Progress",
    type: "Web Development",
    progress: 65,
    dueDate: "Feb 15, 2024",
    client: "Anime Convention Team",
    budget: "$1,500"
  },
  {
    id: 2,
    title: "Mobile App for Manga Reader",
    description: "Cross-platform mobile application for reading and organizing manga collections.",
    status: "Planning",
    type: "App Development", 
    progress: 20,
    dueDate: "Mar 1, 2024",
    client: "Manga Reader Team",
    budget: "$3,000"
  },
  {
    id: 3,
    title: "YouTube Channel Intro Video",
    description: "High-energy intro video with custom animations and sound design.",
    status: "Completed",
    type: "Video Editing",
    progress: 100,
    dueDate: "Jan 20, 2024",
    client: "Gaming Channel",
    budget: "$150"
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">Projects</h1>
          </div>
          
          <Button className="glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid gap-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="glass-card p-6 hover:glow transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-3">{project.description}</p>
                    </div>
                    <Badge 
                      variant={project.status === "In Progress" ? "default" : 
                               project.status === "Completed" ? "secondary" : "outline"}
                      className={project.status === "In Progress" ? "bg-gradient-to-r from-primary to-accent" : 
                                project.status === "Completed" ? "bg-gradient-to-r from-secondary to-secondary-glow" : ""}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">Type:</span>
                      <span>{project.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Due:</span>
                      <span>{project.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Client:</span>
                      <span>{project.client}</span>
                    </div>
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
                </div>
                
                <div className="lg:text-right">
                  <div className="text-2xl font-bold gradient-text mb-2">{project.budget}</div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="glass-card border-glass-border hover:border-primary"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;