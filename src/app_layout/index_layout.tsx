import { Box } from "@mui/material";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";
import "./index_layout.css";

interface LayoutProps {
	user: {
		id: string;
		username: string;
		role: string;
	};
}

const General_Layout = ({ user }: LayoutProps) => {
	console.log("layout level 3");

	if (user.id.length === 0) {
		// returning the login/register pages without the header or the footer
		return (
			<main style={{ height: "100%", width: "100%" }}>
				<Main user={user} />
			</main>
		);
	}

	return (
		<Box sx={{ display: "flex", height: "100%" }}>
			<header className="myHeader">
				<Header />
			</header>

			<main className="myMain">
				<Main user={user} />
			</main>

			<footer className="myFooter">
				<Footer />
			</footer>
		</Box>
	);
};

export default General_Layout;
