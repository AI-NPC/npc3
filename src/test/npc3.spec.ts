import { NPC3 } from '../classes/NPC3';
import { OPENAI_API_KEY } from './config/envs';

describe('NPC3', () => {
  test('Hello NPC3', async () => {
    let npc3 = new NPC3({ openaiAPIKey: OPENAI_API_KEY });
    jest.setTimeout(10000);
    let prompt = 'Hello';
    let output = await npc3.generateAnswer({ prompt: prompt });
    expect(output?.length).toBeGreaterThan(0);
  });
});
