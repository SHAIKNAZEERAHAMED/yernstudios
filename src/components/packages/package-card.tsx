import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface PackageCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  characterImage: string;
  isPopular?: boolean;
  onSelect: () => void;
}

export const PackageCard = ({
  title,
  price,
  description,
  features,
  characterImage,
  isPopular = false,
  onSelect
}: PackageCardProps) => {
  return (
    <Card className={`glass-card p-6 hover:glow transition-all duration-300 relative ${
      isPopular ? 'neon-border' : ''
    }`}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent">
          Most Popular
        </Badge>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={characterImage} 
          alt={title}
          className="w-16 h-16 rounded-full border-2 border-primary/30"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
          <div className="text-3xl font-bold gradient-text mb-2">₹{price.replace(/[^\d]/g, '')}</div>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <div className="w-2 h-2 bg-primary rounded-full mr-3" />
            {feature}
          </li>
        ))}
      </ul>
      
      <Button 
        onClick={onSelect}
        className="w-full glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow group"
      >
        Select Package
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
};