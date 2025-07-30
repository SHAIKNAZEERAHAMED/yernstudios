import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [showNewProject, setShowNewProject] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleCreateProject = () => {
    if (!title || !description || !type) return;
    setProjects([
      ...projects,
      {
        id: Date.now(),
        title,
        description,
        type,
        status: "New",
        progress: 0,
        dueDate: "",
        client: "You",
        budget: "-",
      },
    ]);
    setShowNewProject(false);
    setTitle("");
    setDescription("");
    setType("");
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">Projects</h1>
          </div>
          <Button
            onClick={() => setShowNewProject(true)}
            className="glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {showNewProject && (
          <Card className="glass-card p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <div className="mb-4">
              <input
                className="input mb-2 w-full"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="input mb-2 w-full"
                placeholder="Project Type (e.g. Web, App, Video)"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <textarea
                className="input mb-2 w-full"
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCreateProject}
                className="glow bg-gradient-to-r from-primary to-accent"
              >
                Create
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewProject(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        <div className="grid gap-6">
          {projects.length === 0 ? (
            <Card className="glass-card p-6 text-center">
              <p className="text-muted-foreground">
                No projects yet. Click 'New Project' to add one!
              </p>
            </Card>
          ) : (
            projects.map((project) => (
              <Card
                key={project.id}
                className="glass-card p-6 hover:glow transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-3">
                          {project.description}
                        </p>
                      </div>
                      <span className="badge bg-gradient-to-r from-primary to-accent">
                        {project.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-muted-foreground">Type:</span>
                        <span>{project.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;