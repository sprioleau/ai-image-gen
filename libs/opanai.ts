import { Configuration, OpenAIApi } from "openai";

const openAIConfiguration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfiguration);

export default openai;
