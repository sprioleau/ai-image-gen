/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useRef, useState } from "react";

export default function Home() {
	const formRef = useRef<HTMLFormElement>(null);
	const [imageUrl, setImageUrl] = useState<string | undefined>();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(formRef.current!);
		const data = Object.fromEntries(formData.entries());

		if (!data.prompt) return;

		const response = await fetch("/api/generate-image", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const { data: generatedImageUrl } = await response.json();
		setImageUrl(generatedImageUrl);
	};

	return (
		<>
			<Head>
				<title>AI Image Generator</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="main">
				<h1>AI Image Generator</h1>
				<p>Describe the image you&apos;d like to see.</p>
				<form ref={formRef} onSubmit={handleSubmit}>
					<input type="text" name="prompt" id="prompt" />
					<select name="size" id="size">
						<option value="256x256">Small</option>
						<option value="512x512">Medium</option>
						<option value="1024x1024">Large</option>
					</select>
					<button type="submit">Submit</button>
				</form>
				{imageUrl && <img src={imageUrl} alt="Generated Image" />}
			</main>
		</>
	);
}
