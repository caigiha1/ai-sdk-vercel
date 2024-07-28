import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/toggle-theme";
import { AI } from "./actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Crypto Chat Bot",
	description:
		"Get crypto prices, market stats and chat with AI cryptocurrency",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AI>
			<html lang="en">
				<body className={inter.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<header className="mt-2 pr-2 flex flex-1 w-full justify-end items-end">
							<ModeToggle />
						</header>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</AI>
	);
}
