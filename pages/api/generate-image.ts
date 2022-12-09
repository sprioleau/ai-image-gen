// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import openai from "../../libs/opanai";

type Data = {
	data: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { prompt, size } = req.body;

	const response = await openai.createImage({
		prompt,
		size,
		n: 1,
	});

	const imageUrl = response.data.data[0].url ?? "";

	res.status(200).json({ data: imageUrl });
}
