import { Package, FolderOpen, Mail, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const BottomNavigation = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && ["nazeershiek098@gmail.com", "yernstudios@gmail.com"].includes(user.email)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  const navigationItems = [
    { icon: Package, label: "Packages", path: "/packages" },
    { icon: FolderOpen, label: "Projects", path: "/projects" },
    { icon: Mail, label: "Contact", path: "/contact" },
    // Only show Dashboard for non-admins
    ...(!isAdmin
      ? [{ icon: User, label: "Dashboard", path: "/dashboard" }]
      : [{ icon: User, label: "Profile", path: "/profile" }]),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-glass-border">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navigationItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg transition-all duration-300",
                isActive
                  ? "text-primary glow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};