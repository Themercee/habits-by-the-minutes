export interface Activity {
  id: string;
  name: string;
  durationMinutes: number;
}

export interface Loop {
  id: string;
  name: string;
  activities: Activity[];
  createdAt: string;
}

export interface TimerState {
  loopId: string;
  currentActivityIndex: number;
  remainingSeconds: number;
  isPaused: boolean;
  isActive: boolean;
}
