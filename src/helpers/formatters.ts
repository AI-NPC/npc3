import { Approach } from '../types';

export const extractApproach = (answer: string): Approach => {
  const lines = answer?.split('\n');
  const split = (str: string) => {
    return str?.split(')')[1].replace(/"/g, '');
  };
  return {
    message: split(lines[1]),
    choices: [split(lines[2]), split(lines[3]), split(lines[4])],
  };
};
