export type NPC3Config = {
  openAi: {
    configuration: {
      apiKey: string;
    };
    completion: {
      model: string;
      max_tokens: number;
      temperature: number;
      top_p: number;
      n: number;
      stream: boolean;
      logprobs: null;
      stop: string;
    };
  };
};
