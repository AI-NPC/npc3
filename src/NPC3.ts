import { OpenAIApi, Configuration } from 'openai';
import { NPC3Config } from './NPC3Config';

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
    };
    this.ai = new OpenAIApi(new Configuration(this.config.openAi.configuration));
  }

  async generateAnswer({ prompt }: { prompt: string }) {
    let ouptut: string | undefined;
    try {
      const completion = await this.ai.createCompletion({
        prompt: prompt,
        ...this.config.openAi.completion,
      });
      ouptut = completion.data.choices[0].text;
      console.log(ouptut);
    } catch (error: any) {
      if (error && error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      return undefined;
    }
    return ouptut;
  }
}
