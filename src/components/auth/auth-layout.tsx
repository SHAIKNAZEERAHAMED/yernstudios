import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 cyber-grid">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-2xl neon-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};