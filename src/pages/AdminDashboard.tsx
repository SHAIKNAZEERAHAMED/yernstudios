import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FolderOpen, LogOut, MessageCircle, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAILS = [
  "nazeershiek098@gmail.com",
  "yernstudios@gmail.com"
];

const AdminDashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [shootOrders, setShootOrders] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !ADMIN_EMAILS.includes(user.email)) {
      toast({
        title: "Access Denied",
        description: "You are not authorized to view this page.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    await loadAdminData();
    setIsLoading(false);
  };

  const loadAdminData = async () => {
    try {
      const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      const { data: shootOrdersData } = await supabase.from('shoot_orders').select('*').order('created_at', { ascending: false });
      const { data: messagesData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      setOrders(ordersData || []);
      setShootOrders(shootOrdersData || []);
      setContactMessages(messagesData || []);
      setProjects(projectsData || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load admin data.", variant: "destructive" });
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

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="border-glass-border">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
        <section className="mb-8">
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
                  <TableHead>Contact</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 10).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.customer_name || order.customer_email}</TableCell>
                    <TableCell>{order.package_name}</TableCell>
                    <TableCell>₹{order.amount}</TableCell>
                    <TableCell>
                      <select
                        value={order.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          await supabase.from('orders').update({ status: newStatus }).eq('id', order.id);
                          setOrders((prev) => prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
                        }}
                        className="border rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="done">Done</option>
                        <option value="rejected">Rejected</option>
                        <option value="delayed">Delayed</option>
                      </select>
                    </TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{order.contact || '-'}</TableCell>
                    <TableCell>{order.details || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Recent Shoot Orders</h2>
          <Card className="glass-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Email</TableHead>
                  <TableHead>Shoot Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shootOrders.slice(0, 10).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.customer_email}</TableCell>
                    <TableCell>{order.shoot_type}</TableCell>
                    <TableCell>{order.location}</TableCell>
                    <TableCell>₹{order.price}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{order.contact}</TableCell>
                    <TableCell>{order.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Contact Messages</h2>
          <div className="space-y-4">
            {contactMessages.slice(0, 10).map((message) => (
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
    </div>
  );
};

export default AdminDashboard;
