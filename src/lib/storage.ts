import { Loop } from "@/types/loop";

const STORAGE_KEY = "habit-loops";

export const getLoops = (): Loop[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveLoops = (loops: Loop[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(loops));
};

export const addLoop = (loop: Loop): void => {
  const loops = getLoops();
  loops.push(loop);
  saveLoops(loops);
};

export const updateLoop = (updatedLoop: Loop): void => {
  const loops = getLoops();
  const index = loops.findIndex(l => l.id === updatedLoop.id);
  if (index !== -1) {
    loops[index] = updatedLoop;
    saveLoops(loops);
  }
};

export const deleteLoop = (loopId: string): void => {
  const loops = getLoops().filter(l => l.id !== loopId);
  saveLoops(loops);
};
