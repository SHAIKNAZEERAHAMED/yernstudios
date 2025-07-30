import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Settings, Star, Camera, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import akariProfile from "@/assets/akari-profile.jpg";

interface User {
  name: string;
  email: string;
  membershipLevel: string;
  profilePicture: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser && ["nazeershiek098@gmail.com", "yernstudios@gmail.com"].includes(authUser.email)) {
        navigate("/admin-dashboard");
      }
    };
    checkAdmin();

    const userData = localStorage.getItem('yarn_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name,
        email: parsedUser.email
      });
    }
  }, []);

  const handleSave = async () => {
    if (user) {
      // Update in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: formData.name })
        .eq('user_id', user.email);
      if (error) {
        toast({ title: 'Error', description: 'Failed to update profile.', variant: 'destructive' });
        return;
      }
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      localStorage.setItem('yarn_user', JSON.stringify(updatedUser));
      setEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('yarn_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold gradient-text">Profile Settings</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="glass-card p-6 lg:col-span-1">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-24 h-24 border-4 border-primary">
                  <AvatarImage src={akariProfile} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 glow"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <h2 className="text-xl font-bold mb-2">{user.name}</h2>
              <p className="text-muted-foreground text-sm mb-4">{user.email}</p>
              
              <Badge className="bg-gradient-to-r from-primary to-accent mb-4">
                <Star className="w-3 h-3 mr-1" />
                {user.membershipLevel}
              </Badge>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects:</span>
                  <span>3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed:</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since:</span>
                  <span>Jan 2024</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Edit Profile */}
          <Card className="glass-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Personal Information</h3>
              <Button
                variant={editing ? "outline" : "default"}
                onClick={() => setEditing(!editing)}
                className={editing ? "glass-card border-glass-border" : "glow bg-gradient-to-r from-primary to-accent"}
              >
                {editing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!editing}
                  className="glass-card border-glass-border"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!editing}
                  className="glass-card border-glass-border"
                />
              </div>
              
              <div>
                <Label>Membership Level</Label>
                <div className="mt-2">
                  <Badge className="bg-gradient-to-r from-primary to-accent">
                    <Star className="w-3 h-3 mr-1" />
                    {user.membershipLevel}
                  </Badge>
                </div>
              </div>

              {editing && (
                <Button
                  onClick={handleSave}
                  className="w-full glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow"
                >
                  Save Changes
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Logout Section */}
        <Card className="glass-card p-6 mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">Sign Out</h3>
              <p className="text-muted-foreground text-sm">
                Sign out of your YeRN Studios account
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="glass-card border-glass-border hover:border-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;