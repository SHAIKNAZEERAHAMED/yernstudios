import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FolderOpen, MessageCircle, Plus, Star, LogOut, Users, Package } from "lucide-react";
import akariProfile from "@/assets/akari-profile.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  membershipLevel: string;
  profilePicture: string;
  role: string;
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
  const [projects, setProjects] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        navigate('/login');
        return;
      }

      // Get user profile and role
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      const { data: userRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authUser.id)
        .single();

      const userData = {
        id: authUser.id,
        name: profile?.display_name || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        membershipLevel: profile?.membership_level || 'Basic Member',
        profilePicture: profile?.avatar_url || akariProfile,
        role: userRole?.role || 'customer'
      };

      setUser(userData);
      
      // Load data based on role
      if (userData.role === 'admin') {
        await loadAdminData();
      } else {
        await loadCustomerData(authUser.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAdminData = async () => {
    try {
      // Load all orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Load all contact messages
      const { data: messagesData } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      // Load all projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      setOrders(ordersData || []);
      setContactMessages(messagesData || []);
      setProjects(projectsData || []);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const loadCustomerData = async (userId: string) => {
    try {
      // Load user's projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      // Load user's orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      setProjects(projectsData || []);
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error loading customer data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold gradient-text">{user.name}</h1>
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-primary to-accent">
                  <Star className="w-3 h-3 mr-1" />
                  {user.membershipLevel}
                </Badge>
                {user.role === 'admin' && (
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Admin
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-glass-border"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {user.role === 'admin' ? (
          // Admin Dashboard
          <div className="space-y-8">
            {/* Admin Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <Package className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-bold">Total Orders</h3>
                    <p className="text-2xl font-bold gradient-text">{orders.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-bold">Contact Messages</h3>
                    <p className="text-2xl font-bold gradient-text">{contactMessages.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <FolderOpen className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-bold">Active Projects</h3>
                    <p className="text-2xl font-bold gradient-text">{projects.length}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Orders */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
              <Card className="glass-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.slice(0, 5).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.customer_name || order.customer_email}</TableCell>
                        <TableCell>{order.package_name}</TableCell>
                        <TableCell>${order.amount / 100}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </section>

            {/* Contact Messages */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Recent Contact Messages</h2>
              <div className="space-y-4">
                {contactMessages.slice(0, 3).map((message) => (
                  <Card key={message.id} className="glass-card p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{message.name}</h3>
                      <Badge variant={message.status === 'new' ? 'default' : 'secondary'}>
                        {message.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
                    {message.service && (
                      <p className="text-sm font-medium mb-2">Service: {message.service}</p>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        ) : (
          // Customer Dashboard
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Customer Projects */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <FolderOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">My Projects</h2>
              </div>
              
              <div className="space-y-4">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <Card key={project.id} className="glass-card p-6 hover:glow transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                          <p className="text-muted-foreground text-sm">{project.project_type}</p>
                        </div>
                        <Badge 
                          variant={project.status === "in_progress" ? "default" : "secondary"}
                          className={project.status === "in_progress" ? "bg-gradient-to-r from-primary to-accent" : ""}
                        >
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress || 0}%` }}
                          />
                        </div>
                      </div>
                      
                      {project.due_date && (
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(project.due_date).toLocaleDateString()}
                        </p>
                      )}
                    </Card>
                  ))
                ) : (
                  <Card className="glass-card p-6 text-center">
                    <p className="text-muted-foreground">No projects yet. Order a package to get started!</p>
                  </Card>
                )}
              </div>
            </section>

            {/* Customer Orders */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">My Orders</h2>
              </div>
              
              <div className="space-y-4">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <Card key={order.id} className="glass-card p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">{order.package_name}</h3>
                        <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              await supabase.from('orders').delete().eq('id', order.id);
                              setOrders(orders.filter(o => o.id !== order.id));
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {order.package_type} - {order.package_tier}
                      </p>
                      <p className="text-lg font-bold gradient-text">${order.amount / 100}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </Card>
                  ))
                ) : (
                  <Card className="glass-card p-6 text-center">
                    <p className="text-muted-foreground">No orders yet. Check out our packages!</p>
                  </Card>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};