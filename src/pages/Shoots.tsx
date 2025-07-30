import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const shoots = [
	{
		title: "Outdoor Shoot",
		price: 4000,
		description: "Professional outdoor photography and videography.",
		locations: ["Tadepalligudem", "Tanuku", "Bhimavaram"],
	},
	{
		title: "Event Covering",
		price: 6000,
		description: "Full event coverage for functions, parties, and more.",
		locations: ["Tadepalligudem", "Tanuku", "Bhimavaram"],
	},
	{
		title: "Shortfilm Cinematography",
		price: 12000,
		description: "Cinematic shortfilm shooting and editing.",
		locations: ["Tadepalligudem", "Tanuku", "Bhimavaram"],
	},
];

const Shoots = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleOrderShoot = async (shoot) => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				toast({
					title: "Authentication Required",
					description: "Please login to order a shoot.",
				});
				navigate("/login");
				return;
			}
			let location = "";
			while (true) {
				const input = window.prompt(
					`Enter location (${shoot.locations.join(", ")}):`
				);
				if (input === null) return; // User cancelled
				if (shoot.locations.includes(input)) {
					location = input;
					break;
				}
				alert("Please enter a valid location.");
			}
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
				const input = window.prompt("Describe your shoot requirements:");
				if (input === null) return; // User cancelled
				if (input) {
					details = input;
					break;
				}
				alert("Shoot description is required!");
			}
			const { error } = await supabase.from("shoot_orders").insert([
				{
					user_id: user.id,
					shoot_type: shoot.title,
					location,
					price: shoot.price,
					contact,
					details,
					status: "pending",
					customer_email: user.email,
				},
			]);
			if (error) throw error;
			toast({
				title: "Shoot Order Created!",
				description: `Your order for ${shoot.title} has been created.`,
			});
			navigate("/dashboard");
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to create shoot order. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="min-h-screen py-20 px-6">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold gradient-text mb-8 text-center">
					Shoots
				</h1>
				<div className="grid md:grid-cols-2 gap-8">
					{shoots.map((shoot, idx) => (
						<Card
							key={idx}
							className="glass-card p-6 flex flex-col justify-between"
						>
							<div>
								<h2 className="text-2xl font-bold mb-2">{shoot.title}</h2>
								<p className="mb-2 text-muted-foreground">
									{shoot.description}
								</p>
								<p className="mb-2">
									<b>Locations:</b> {shoot.locations.join(", ")}
								</p>
								<p className="mb-4 text-lg font-bold gradient-text">
									₹{shoot.price}
								</p>
							</div>
							<Button
								className="w-full glow bg-gradient-to-r from-primary to-accent"
								onClick={() => handleOrderShoot(shoot)}
							>
								Order Now
							</Button>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default Shoots;
