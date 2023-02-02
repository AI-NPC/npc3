import { TEST_GAME_CONTEXT } from './config/constants';
import { NPC3 } from '../classes/NPC3';
import { OPENAI_API_KEY } from './config/envs';
import { NPC } from '../types';

describe('twoNPCs', () => {
  test('twoNPCs', async () => {
    let npc3 = new NPC3({ openaiAPIKey: OPENAI_API_KEY });

    let npcs: NPC[] = await npc3.getTwoNPCs({ gameContext: TEST_GAME_CONTEXT });

    expect(npcs.length).toBe(2);

    expect(npcs[0].name).toBeTruthy();
    expect(npcs[1].name).toBeTruthy();

    expect(npcs[0].description).toBeTruthy();
    expect(npcs[1].description).toBeTruthy();
  });
});
