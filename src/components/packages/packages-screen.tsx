import { PackageCard } from "./package-card";
import { useToast } from "@/hooks/use-toast";
import videoEditingChar from "@/assets/video-editing-char.jpg";
import webDevChar from "@/assets/web-dev-char.jpg";
import appDevChar from "@/assets/app-dev-char.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const videoPackages = [
	{
		title: "Short Form Content",
		price: "$800",
		description:
			"Perfect for TikToks, Reels, and Shorts (up to 1 minute in length)",
		features: [
			"Up to 1 minute duration",
			"Basic editing",
			"Color correction",
			"Music sync",
			"Quick turnaround",
		],
	},
	{
		title: "Medium Form Content",
		price: "$2500",
		description:
			"Ideal for YouTube videos, podcasts, and tutorials (up to 10 minutes in length)",
		features: [
			"Up to 10 minutes duration",
			"Advanced editing",
			"Motion graphics",
			"Audio enhancement",
			"Multiple revisions",
		],
		isPopular: true,
	},
	{
		title: "Long Form Content",
		price: "$3500",
		description:
			"Best for documentaries, films, and extended content (over 10 minutes in length)",
		features: [
			"Over 10 minutes duration",
			"Professional editing",
			"Custom animations",
			"Sound design",
			"Unlimited revisions",
		],
	},
];

const webPackages = [
	{
		title: "Landing Page",
		price: "$9000",
		description: "A single-page website to showcase your brand or product",
		features: [
			"Responsive design",
			"Modern UI/UX",
			"Contact form",
			"SEO optimization",
			"Fast loading",
		],
	},
	{
		title: "Small Business Website",
		price: "$15000",
		description:
			"A multi-page website with essential features for small businesses",
		features: [
			"Up to 5 pages",
			"CMS integration",
			"E-commerce ready",
			"Analytics setup",
			"Mobile optimized",
		],
		isPopular: true,
	},
	{
		title: "E-commerce Website",
		price: "$20000",
		description:
			"A fully functional online store with product listings and payment integration",
		features: [
			"Product catalog",
			"Payment gateway",
			"Inventory management",
			"Order tracking",
			"Admin dashboard",
		],
	},
];

const appPackages = [
	{
		title: "Simple App",
		price: "$27000",
		description: "A basic app with limited features, suitable for simple tasks",
		features: [
			"Basic functionality",
			"Native iOS/Android",
			"Simple UI",
			"Cloud sync",
			"App store ready",
		],
	},
	{
		title: "Feature-Rich App",
		price: "$34000",
		description:
			"An app with multiple features and functionalities for a more complex user experience",
		features: [
			"Advanced features",
			"User authentication",
			"Push notifications",
			"Analytics",
			"Social integration",
		],
		isPopular: true,
	},
	{
		title: "Complex App",
		price: "$60000",
		description:
			"A sophisticated app with advanced features, integrations, and a high level of customization",
		features: [
			"Custom backend",
			"AI integration",
			"Real-time features",
			"Third-party APIs",
			"Enterprise grade",
		],
	},
];

export const PackagesScreen = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleSelectPackage = async (
		packageTitle: string,
		price: string,
		packageType: string,
		packageTier: string
	) => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				toast({
					title: "Authentication Required",
					description: "Please login to purchase a package.",
				});
				navigate("/login");
				return;
			}
			// Get user profile
			const { data: profile, error: profileError } = await supabase
				.from("profiles")
				.select("display_name")
				.eq("user_id", user.id)
				.single();
			if (profileError || !profile || !profile.display_name) {
				toast({
					title: "Profile Error",
					description: "Please complete your profile before ordering.",
					variant: "destructive",
				});
				navigate("/profile");
				return;
			}
			// Prompt for more details
			let contact = "";
			while (true) {
				const input = window.prompt("Enter your contact number:");
				if (input === null) return; // User cancelled
				if (input) {
					contact = input;
					break;
				}
				alert("Contact number is required!");
			}
			let details = "";
			while (true) {
				const input = window.prompt("Describe your project requirements:");
				if (input === null) return; // User cancelled
				if (input) {
					details = input;
					break;
				}
				alert("Project description is required!");
			}
			// Create order record
			const { error } = await supabase
				.from("orders")
				.insert([
					{
						user_id: user.id,
						package_name: packageTitle,
						package_type: packageType,
						package_tier: packageTier,
						amount: parseInt(price.replace(/[^\d]/g, "")),
						currency: "inr",
						status: "pending",
						customer_name: profile?.display_name || user.email?.split("@")[0],
						customer_email: user.email,
						contact,
						details,
					},
				]);
			if (error) throw error;
			toast({
				title: "Order Created!",
				description: `Your order for ${packageTitle} has been created. We'll contact you shortly to begin your project.`,
			});
			navigate("/dashboard");
		} catch (error) {
			console.error("Order creation error:", error);
			toast({
				title: "Error",
				description: "Failed to create order. Please try again.",
				variant: "destructive",
			});
		}
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
					<h2 className="text-3xl font-bold text-center mb-2">
						Video Editing
					</h2>
					<p className="text-muted-foreground text-center mb-8">
						Professional video editing services
					</p>
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
								onSelect={() =>
									handleSelectPackage(
										pkg.title,
										pkg.price,
										"Video Editing",
										pkg.title
									)
								}
							/>
						))}
					</div>
				</section>

				{/* Web Development Section */}
				<section className="mb-16">
					<h2 className="text-3xl font-bold text-center mb-2">
						Web Development
					</h2>
					<p className="text-muted-foreground text-center mb-8">
						Custom websites and web applications
					</p>
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
								onSelect={() =>
									handleSelectPackage(
										pkg.title,
										pkg.price,
										"Web Development",
										pkg.title
									)
								}
							/>
						))}
					</div>
				</section>

				{/* App Development Section */}
				<section className="mb-16">
					<h2 className="text-3xl font-bold text-center mb-2">
						App Development
					</h2>
					<p className="text-muted-foreground text-center mb-8">
						Native mobile applications
					</p>
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
								onSelect={() =>
									handleSelectPackage(
										pkg.title,
										pkg.price,
										"App Development",
										pkg.title
									)
								}
							/>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};