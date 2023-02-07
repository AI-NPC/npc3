import { GameContext, NPC, Message } from '../types';

export const GAME_CONTEXT_PROMPT = (gameContext: GameContext): string => {
  const format = (arr: string[]): string => {
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr.join(' and ');
    return arr.slice(0, -1).join(', ') + ', and ' + arr.slice(-1);
  };
  return `----Game Context
  ${gameContext.setting} game set in a ${gameContext.tone} world where the player's main objectives are ${format(
    gameContext.objectives,
  )}. The game setting involves ${format(gameContext.details)}`;
};

export const NPC_CONTEXT_PROMPT = (gameContext: GameContext, npc: NPC) =>
  `${GAME_CONTEXT_PROMPT(gameContext)}
  ----NPC Context
  You are a NPC inside the game. Your name is ${npc.name}. ${npc.description}`;

export const TWO_NPCS_PROMPT = (
  gameContext: GameContext,
) => `Generate 2 differents NPCs persona for a ${GAME_CONTEXT_PROMPT(
  gameContext,
)}. The two NPCs should fit well within this game context and help provide a deeper and more engaging experience for the player. The persona should contain a name and a description including personality traits.
Desired format, nothing else:
 <npc1_name>; <npc1_description>
 <npc2_name>; <npc2_description>`;

export const APPROACH_NPC_PROMPT = (npc: NPC, gameContext: GameContext) => `${NPC_CONTEXT_PROMPT(
  gameContext,
  npc,
)} A player approaches...
You are to write the NPC first sentence to the player as well as 3 choice the player can choose as a reply to improve the user experience following the game context.
Desired output format, nothing else:
NPC)<npc_first_sentence>
A)<user_choice1>
B)<user_choice2>
C)<user_choice3>
`;

export const DISCUSS_NPC_PROMPT = (gameContext: GameContext, npc: NPC, history: Message[]) => {
  const format = (messages: Message[]) => {
    let formattedString = '';
    for (const message of messages) {
      formattedString += message.sender.toUpperCase() + ') ' + message.content + '\n';
    }
    return formattedString;
  };
  return `${NPC_CONTEXT_PROMPT(gameContext, npc)}

---- Discussion Context
${format(history)}

You are to write the NPC answer to the player as well as 3 choice the player can choose as a reply to improve the user experience following the game context.
Desired output format, nothing else:
NPC)<npc_answer>
A)<user_choice1>
B)<user_choice2>
C)<user_choice3>
`;
};
