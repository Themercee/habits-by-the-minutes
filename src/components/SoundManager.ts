class SoundManager {
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    this.loadSounds();
  }

  private loadSounds() {
    const sounds = {
      activityEnd: '/sounds/activity-end.mp3',
      loopComplete: '/sounds/loop-complete.mp3',
    };

    for (const key in sounds) {
      const path = sounds[key as keyof typeof sounds];
      const audio = new Audio(path);
      audio.load(); // Preload the audio
      this.audioCache.set(key, audio);
    }
  }

  playSound(soundType: 'activityEnd' | 'loopComplete') {
    const audio = this.audioCache.get(soundType);
    if (audio) {
      audio.currentTime = 0; // Rewind to start if already playing
      audio.play().catch(error => console.error(`Error playing sound ${soundType}:`, error));
    } else {
      console.warn(`Sound type ${soundType} not found in cache.`);
    }
  }
}

export const soundManager = new SoundManager();