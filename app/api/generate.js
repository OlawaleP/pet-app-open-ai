import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config({ path: __dirname + '/.env' });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration); 

export default async function(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured"
      }
    });
    return;
  }

  const animal = req.body.animal || '';

  const response = await openai.createCompletion({
    model: "text-davinci-003", 
    prompt: `suggest three pet names for the following ${animal}`,
    temperature: 0.8,
    max_tokens: 100,
  });
  res.status(200).json({ result: response.data.choices[0].text })
}