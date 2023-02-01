import { NPC3 } from '../NPC3';
import { OPENAI_API_KEY } from './config/envs';

test('NPC3', async () => {
  let npc3 = new NPC3({ openaiAPIKey: OPENAI_API_KEY });
  let prompt =
    "Generate a dialogue for a friendly NPC in the game Minecraft. The NPC is greeting the player and wants to offer help. The NPC is named Steve and is a farmer. The player just entered the NPC's farm.";
  let output = await npc3.generateAnswer({ prompt: prompt });
  expect(output?.length).toBeGreaterThan(0);
});
