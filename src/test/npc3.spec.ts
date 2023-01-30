import NPC3 from '../class/NPC3';
import { NPC3_CONFIG } from '../config/npc3';

test('NPC3', async () => {
  let npc3 = new NPC3({ configuration: NPC3_CONFIG });
  let prompt =
    "Generate a dialogue for a friendly NPC in the game Minecraft. The NPC is greeting the player and wants to offer help. The NPC is named Steve and is a farmer. The player just entered the NPC's farm.";
  let output = await npc3.generateAnswer({ prompt: prompt });
  console.log(output);
  expect(output?.length).toBeGreaterThan(0);
});
