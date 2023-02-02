import { TEST_GAME_CONTEXT, TEST_NPC, TEST_HISTORY } from './config/constants';
import { NPC3 } from '../classes/NPC3';
import { OPENAI_API_KEY } from './config/envs';
import { NPC } from '../types';

describe('discuss with NPC', () => {
  test('approach', async () => {
    let npc3 = new NPC3({ openaiAPIKey: OPENAI_API_KEY });
    let answer = await npc3.discuss({ gameContext: TEST_GAME_CONTEXT, npc: TEST_NPC, history: TEST_HISTORY });
    expect(answer.message).toBeTruthy();
    expect(answer.choices.length).toBe(3);
    answer.choices.forEach((choice) => {
      expect(choice).toBeTruthy();
    });
  });
});
