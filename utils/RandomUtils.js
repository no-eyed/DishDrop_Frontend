import { v4 as uuidv4 } from 'uuid';

export function generateRandom(length) {
  const uuid = uuidv4();
  return uuid.substring(0, length);
}