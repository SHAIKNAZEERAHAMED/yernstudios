import { PackageCard } from "./package-card";
import { useToast } from "@/hooks/use-toast";
import videoEditingChar from "@/assets/video-editing-char.jpg";
import webDevChar from "@/assets/web-dev-char.jpg";
import appDevChar from "@/assets/app-dev-char.jpg";

const videoPackages = [
  {
    title: "Short Form Content",
    price: "$50",
    description: "Perfect for TikToks, Reels, and Shorts (up to 1 minute in length)",
    features: ["Up to 1 minute duration", "Basic editing", "Color correction", "Music sync", "Quick turnaround"]
  },
  {
    title: "Medium Form Content", 
    price: "$150",
    description: "Ideal for YouTube videos, podcasts, and tutorials (up to 10 minutes in length)",
    features: ["Up to 10 minutes duration", "Advanced editing", "Motion graphics", "Audio enhancement", "Multiple revisions"],
    isPopular: true
  },
  {
    title: "Long Form Content",
    price: "$300", 
    description: "Best for documentaries, films, and extended content (over 10 minutes in length)",
    features: ["Over 10 minutes duration", "Professional editing", "Custom animations", "Sound design", "Unlimited revisions"]
  }
];

const webPackages = [
  {
    title: "Landing Page",
    price: "$500",
    description: "A single-page website to showcase your brand or product",
    features: ["Responsive design", "Modern UI/UX", "Contact form", "SEO optimization", "Fast loading"]
  },
  {
    title: "Small Business Website",
    price: "$1,500", 
    description: "A multi-page website with essential features for small businesses",
    features: ["Up to 5 pages", "CMS integration", "E-commerce ready", "Analytics setup", "Mobile optimized"],
    isPopular: true
  },
  {
    title: "E-commerce Website",
    price: "$3,000",
    description: "A fully functional online store with product listings and payment integration", 
    features: ["Product catalog", "Payment gateway", "Inventory management", "Order tracking", "Admin dashboard"]
  }
];

const appPackages = [
  {
    title: "Simple App",
    price: "$1,000",
    description: "A basic app with limited features, suitable for simple tasks",
    features: ["Basic functionality", "Native iOS/Android", "Simple UI", "Cloud sync", "App store ready"]
  },
  {
    title: "Feature-Rich App",
    price: "$3,000",
    description: "An app with multiple features and functionalities for a more complex user experience",
    features: ["Advanced features", "User authentication", "Push notifications", "Analytics", "Social integration"],
    isPopular: true
  },
  {
    title: "Complex App", 
    price: "$5,000",
    description: "A sophisticated app with advanced features, integrations, and a high level of customization",
    features: ["Custom backend", "AI integration", "Real-time features", "Third-party APIs", "Enterprise grade"]
  }
];

export const PackagesScreen = () => {
  const { toast } = useToast();

  const handleSelectPackage = (packageTitle: string, price: string) => {
    toast({
      title: "Package Selected!",
      description: `You selected ${packageTitle} for ${price}. Redirecting to checkout...`
    });
    
    // Here you would integrate with your payment system
    // For now, we'll just show the success message
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold gradient-text mb-4">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of digital creative services, 
            designed to bring your vision to life.
          </p>
        </div>

        {/* Video Editing Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">Video Editing</h2>
          <p className="text-muted-foreground text-center mb-8">Professional video editing services</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoPackages.map((pkg, index) => (
              <PackageCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                characterImage={videoEditingChar}
                isPopular={pkg.isPopular}
                onSelect={() => handleSelectPackage(pkg.title, pkg.price)}
              />
            ))}
          </div>
        </section>

        {/* Web Development Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">Web Development</h2>
          <p className="text-muted-foreground text-center mb-8">Custom websites and web applications</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webPackages.map((pkg, index) => (
              <PackageCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                characterImage={webDevChar}
                isPopular={pkg.isPopular}
                onSelect={() => handleSelectPackage(pkg.title, pkg.price)}
              />
            ))}
          </div>
        </section>

        {/* App Development Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">App Development</h2>
          <p className="text-muted-foreground text-center mb-8">Native mobile applications</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appPackages.map((pkg, index) => (
              <PackageCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                characterImage={appDevChar}
                isPopular={pkg.isPopular}
                onSelect={() => handleSelectPackage(pkg.title, pkg.price)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};