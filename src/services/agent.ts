import OpenIA from 'openai';
import { createPrompt } from './prompt';

class Agent {
  openai;
  private readonly EMBEDDING_MODEL = 'text-embedding-3-small';
  private readonly GPT_MODEL = 'gpt-3.5-turbo-0125';

  constructor(config: { apiKey: string | undefined }) {
    this.openai = new OpenIA(config);
  }

  /**
   * Asks a question to the OpenAI chat model and returns the response.
   * @param question - The question to ask the chat model.
   * @returns A Promise that resolves to the response from the chat model.
   */
  async ask(question: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      messages: createPrompt(question),
      model: this.GPT_MODEL,
      max_tokens: 150,
      temperature: 0.7,
    });
    console.log(
      `Model: ${response.model}, Usage: ${JSON.stringify(response.usage)}`
    );
    return response.choices[0].message.content || '';
  }
}

export default Agent;
