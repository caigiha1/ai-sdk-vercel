import { useEffect, useState } from "react";

export default function useAtBottom<T>(offset = 0) {
	const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
	useEffect(() => {
		const handleScroll = () => {
			setIsAtBottom(
				window.innerHeight + window.scrollY >
					document.body.offsetHeight - offset,
			);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [offset]);

	return isAtBottom;
}
