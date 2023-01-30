import { NPC3Config } from '../../NPC3Config';
import { OPENAI_API_KEY } from './envs';

export const NPC3_CONFIG: NPC3Config = {
  openAi: {
    configuration: {
      apiKey: OPENAI_API_KEY,
    },
    completion: {
      model: 'text-davinci-002',
    },
  },
};