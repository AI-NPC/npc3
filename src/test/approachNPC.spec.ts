import { TEST_GAME_CONTEXT } from './config/constants';
import { NPC3 } from '../classes/NPC3';
import { OPENAI_API_KEY } from './config/envs';
import { NPC } from '../types';

describe('approach NPC', () => {
  test('approach', async () => {
    let npc3 = new NPC3({ openaiAPIKey: OPENAI_API_KEY });
    let npcs: NPC[] = await npc3.getTwoNPCs({ gameContext: TEST_GAME_CONTEXT });
    let approach = await npc3.approach({ gameContext: TEST_GAME_CONTEXT, npc: npcs[0] });
    expect(approach.message).toBeTruthy();
    expect(approach.choices.length).toBe(3);
    approach.choices.forEach((choice) => {
      expect(choice).toBeTruthy();
    });
  });
});
