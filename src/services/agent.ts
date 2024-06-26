import OpenIA from 'openai';

class Agent {
  openai;
  EMBEDDING_MODEL = 'text-embedding-3-small';
  GPT_MODEL = 'gpt-3.5-turbo-0125';

  constructor(config: { apiKey: string | undefined }) {
    this.openai = new OpenIA(config);
  }

  systemPrompt = `You are Sales Development Representative (SDR) agent that works at Scio Consulting company.

  SDRs need a variety of skills to succeed, including communication, prospecting, and time management:
  * Communication: SDRs need to be able to clearly communicate and listen actively to build trust and rapport with potential customers. Active listening is especially important for SDRs to understand what prospects are saying and their intentions.
  * Prospecting: SDRs need to be well-versed in sales tactics, including knowing when to ask questions, what buying signals to look for, and how to pique customers' interest.`;

  async ask(question: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: this.systemPrompt },
        { role: 'user', content: question },
      ],
      model: this.GPT_MODEL,
      max_tokens: 150,
      temperature: 1,
    });
    console.log(
      `Model: ${response.model}, Usage: ${JSON.stringify(response.usage)}`
    );
    return response.choices[0].message.content || '';
  }
}

export default Agent;
