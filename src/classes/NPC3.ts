import { OpenAIApi, Configuration } from 'openai';
import { Approach, GameContext, NPC, Message, NPC3Config } from '../types';
import { TWO_NPCS_PROMPT, APPROACH_NPC_PROMPT, DISCUSS_NPC_PROMPT } from '../helpers/prompts';
import { extractApproach } from '../helpers/formatters';

export class NPC3 {
  ai: OpenAIApi;
  config: NPC3Config;

  constructor({ openaiAPIKey }: { openaiAPIKey: string }) {
    this.config = {
      openAi: {
        configuration: {
          apiKey: openaiAPIKey,
        },
        completion: {
          model: 'text-davinci-003',
          max_tokens: 300,
          temperature: 1,
          top_p: 1,
          n: 1,
          stream: false,
          logprobs: null,
          stop: '}',
        },
      },
      logs: {
        prompt: true,
        output: true,
      },
    };
    this.ai = new OpenAIApi(new Configuration(this.config.openAi.configuration));
  }

  handleError(error: any): void {
    if (error && error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }

  async generateAnswer({ prompt }: { prompt: string }): Promise<string> {
    try {
      const completion = await this.ai.createCompletion({
        prompt: prompt,
        ...this.config.openAi.completion,
      });
      const output = completion.data.choices[0].text;
      if (typeof output === 'undefined') throw new Error('No output');
      if (this.config.logs.prompt) console.log(`---- PROMPT ----\n\n${prompt}`);
      if (this.config.logs.output) console.log(`---- OUTPUT ----\n\n${output}`);
      return output;
    } catch (error: any) {
      this.handleError(error);
    }
    return '';
  }

  async getTwoNPCs({ gameContext }: { gameContext: GameContext }): Promise<NPC[]> {
    const npcs: NPC[] = [];
    try {
      const ouptut = await this.generateAnswer({ prompt: TWO_NPCS_PROMPT(gameContext) });
      const lines = ouptut?.split('\n');
      if (!lines || lines?.length === 0) throw new Error('No lines');
      for (const line of lines) {
        if (line.length > 0) {
          const [name, description] = line.split(';');
          npcs.push({ name: name, description: description });
        }
      }
    } catch (error: any) {
      this.handleError(error);
    }
    console.log(npcs);
    return npcs;
  }

  async approach({ gameContext, npc }: { gameContext: GameContext; npc: NPC }): Promise<Approach> {
    try {
      const output = await this.generateAnswer({ prompt: APPROACH_NPC_PROMPT(npc, gameContext) });
      return extractApproach(output);
    } catch (error: any) {
      this.handleError(error);
      throw new Error("Couldn't approach NPC");
    }
  }

  async discuss({
    gameContext,
    npc,
    history,
  }: {
    gameContext: GameContext;
    npc: NPC;
    history: Message[];
  }): Promise<Approach> {
    try {
      const output = await this.generateAnswer({ prompt: DISCUSS_NPC_PROMPT(gameContext, npc, history) });
      return extractApproach(output);
    } catch (error: any) {
      this.handleError(error);
      throw new Error("Couldn't discuss with NPC");
    }
  }
}
