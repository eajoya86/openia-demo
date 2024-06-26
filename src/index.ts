import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenIA from 'openai';

// Loads environment variables from a .env file into process.env
dotenv.config();

// Creates a new express application instance
const app: Express = express();
const port = process.env.PORT || 3000;

const openai = new OpenIA({ apiKey: process.env.OPENAI_API_KEY });
const EMBEDDING_MODEL = 'text-embedding-3-small';
const GPT_MODEL = 'gpt-3.5-turbo-0125';

// Responds with "Hello World!" when a GET request is made to the homepage
app.get('/', (req: Request, res: Response) => {
  const question = req.query.question;
  res.send('You asked: ' + question);
});

// Creates the Node.js web server at the specified host and port. It encapsulates the createServer() method in http module of Node.js API.
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

async function ask(question: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: question }],
    model: GPT_MODEL,
  });
}
