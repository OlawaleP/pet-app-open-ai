import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  if (!openai.apiKey) {
    return Response.json(
      { error: { message: "OpenAI API key not configured" } },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const animal = body.animal || '';

    if (!animal) {
      return Response.json(
        { error: { message: "Please provide an animal" } },
        { status: 400 }
      );
    }

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct", 
      prompt: `Suggest three pet names for the following ${animal}`,
      temperature: 0.8,
      max_tokens: 100,
    });

    return Response.json({ result: response.choices[0].text });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: { message: error.message || "An error occurred" } },
      { status: 500 }
    );
  }
}