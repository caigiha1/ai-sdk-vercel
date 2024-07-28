"use client";

import type { AI } from "@/app/actions";
import ChatList from "@/components/chat-list";
import ChatScrollAnchor from "@/components/chat-scroll-anchor";
import { Button } from "@/components/ui/button";
import { UserMessage } from "@/components/ui/message";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { useActions, useUIState } from "ai/rsc";
import { ArrowDownIcon, PlusIcon } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

const chatSchema = z.object({
	message: z.string().min(1, "Message is required"),
});

export type ChatInput = z.infer<typeof chatSchema>;

export default function Home() {
	const form = useForm<ChatInput>();
	const { formRef, onKeyDown } = useEnterSubmit();
	const [message, setMessage] = useUIState<typeof AI>();
	const { sendMessage } = useActions<typeof AI>();

	const onSubmit: SubmitHandler<ChatInput> = (data) => {
		console.log(data);
		const value = data.message.trim();
		formRef.current?.reset();
		if (!value) return;

		setMessage((cm) => [
			...cm,
			{
				id: Date.now(),
				role: "user",
				display: <UserMessage>{value}</UserMessage>,
			},
		]);
	};

	return (
		<main>
			<div className="pb-[200px] pt-4 md:pt-10">
				<ChatList messages={[]} />
				<ChatScrollAnchor />
			</div>
			<div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[]:">
				<div className="mx-auto sm:max-w-lg">
					<form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} action="">
						<div className="relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background sm:text-sm sm:rounded">
							<TextareaAutosize
								tabIndex={0}
								onKeyDown={onKeyDown}
								placeholder="send a message."
								className="min-h-[60px] w-full resize-none bg-transparent pl-4 pr-16 py-[1.3rem] focus-within:outline-none sm:text-sm"
								autoFocus
								spellCheck={false}
								autoComplete="off"
								autoCorrect="off"
								rows={1}
								{...form.register("message")}
							/>
							<div className="absolute right-0 top-4 sm:right-4">
								<Button
									type="submit"
									size={"icon"}
									disabled={form.watch("message") === ""}
								>
									<ArrowDownIcon className="w-5 h-5" />
									<span className="sr-only">Send message</span>
								</Button>
							</div>
						</div>
					</form>
				</div>

				<Button
					size="lg"
					onClick={(e) => {
						e.preventDefault();
						window.location.reload();
					}}
					variant="outline"
				>
					<PlusIcon className={"pt-4 mt-4 rounded-full bg-background"} />
					<span>New chat</span>
				</Button>
			</div>
		</main>
	);
}
