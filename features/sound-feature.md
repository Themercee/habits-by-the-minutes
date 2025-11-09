# Sound Feature Plan

This document outlines the plan to add a sound notification feature to the application.

Status: completed

- **Purpose:** To encapsulate all logic related to playing sounds.
- **Location:** `src/components/SoundManager.tsx`
- **Implementation:**
    - Create a class or a set of functions to manage audio playback.
    - It will expose a simple API, like `playSound(soundType: 'activityEnd' | 'loopComplete')`.
    - It will use the browser's `Audio` API.
    - Sound files will be stored in the `public/sounds` directory.

Status: completed

- **Location:** `src/components/TimerView.tsx`
- **Implementation:**
    - Import the `SoundManager`.
    - In the `useEffect` hook that manages the timer, add a condition to check if `remainingSeconds` is at a specific value (e.g., 3 seconds) before the activity ends.
    - When the condition is met, call the `playSound('activityEnd')` function.
    - When the loop is completed, call `playSound('loopComplete')`.

## 3. Add Sound Files

Status: completed

- **Location:** `public/sounds/`
- **Action:**
    - Source and add appropriate sound files for:
        - `activity-end.mp3`
        - `loop-complete.mp3`
    - For now, placeholder silent files or simple tones will be used.
