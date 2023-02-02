import { GameContext, Message, NPC } from '../../types';

export const settings = 'War';
export const tone = 'Whimsical';
export const objs = ['Escaping', 'Survival', 'Hiding'];
export const settingsDetails = ['Harry Potter', 'Kairos', 'Cosmic Exodus', 'Shrek'];
export const TEST_GAME_CONTEXT: GameContext = {
  settings: settings,
  settingsDetails: settingsDetails,
  tone: tone,
  objectives: objs,
};

export const TEST_NPC: NPC = {
  name: 'Rufus Weasley',
  description:
    'Rufus is an old, wise wizard who has been around since the days of Harry Potter and Kairos. He is jovial and kind-hearted, but he is a crafty survivor and prefers to remain out of the fray. He knows the game world well and can provide useful tips and advice to the player on how to survive, hide, and escape.',
};

export const TEST_HISTORY: Message[] = [
  {
    sender: 'npc',
    content: 'Greetings adventurer, what brings you to this strange place?',
  },
  {
    sender: 'player',
    content: "I'm looking for a way out of this place.",
  },
];
