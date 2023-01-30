import { OpenAIApi, Configuration } from "openai";
import { NPC3Config } from "../types/types";

export class NPC3 {
  ai: OpenAIApi;
  config: NPC3Config;

  constructor({ configuration }: { configuration: NPC3Config }) {
    this.config = configuration;
    this.ai = new OpenAIApi(
      new Configuration(configuration.openAi.configuration)
    );
  }

  async generateAnswer(prompt: string) {
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
