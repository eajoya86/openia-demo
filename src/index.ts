import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Agent from './services/agent';

// Loads environment variables from a .env file into process.env
dotenv.config();

// Creates a new express application instance
const app: Express = express();
const port = process.env.PORT || 3000;

// Creates a new instance of the Agent class (OpenAI chatbot)
const agent = new Agent({ apiKey: process.env.OPENAI_API_KEY });

// Responds with "Hello World!" when a GET request is made to the homepage
app.get('/ask', async (req: Request, res: Response) => {
  try {
    const question = req.query.question;
    const response = await agent.ask(question as string);
    res.json({ question: question, answer: response });
  } catch (error: any) {
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

// Creates the Node.js web server at the specified host and port. It encapsulates the createServer() method in http module of Node.js API.
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
