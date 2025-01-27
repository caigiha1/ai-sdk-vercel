import { cn } from "@/lib/utils";
import { SparkleIcon, UserIcon } from "lucide-react";

export function UserMessage({ children }: { children: React.ReactNode }) {
	return (
		<div className="group relative items-start md:-ml-12">
			<div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-background">
				<UserIcon />
			</div>
			<div className="ml-4 flex-1 space-y-2 overflow-hidden px-1 ">
				{children}
			</div>
		</div>
	);
}

export function BotMessage({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("group relative flex items-start md:-ml-12", className)}>
			<div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-background">
				<SparkleIcon />
			</div>
			<div className={"ml-4 flex-1 space-y-2 overflow-hidden px-1"}>
				{children}
			</div>
		</div>
	);
}

// export function BotCard({
// 	children,
// 	showAvatar = true,
// }: {
// 	children: React.ReactNode;
// 	showAvatar?: boolean;
// }) {
// 	return (
// 		<div className="group relative flex items-start md:-ml-12">
// 			<div className={} />
// 		</div>
// 	);
// }
