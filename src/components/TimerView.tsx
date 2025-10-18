import { useState, useEffect } from "react";
import { Loop } from "@/types/loop";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipForward, X } from "lucide-react";
import { toast } from "sonner";

interface TimerViewProps {
  loop: Loop;
  onClose: () => void;
}

export const TimerView = ({ loop, onClose }: TimerViewProps) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(loop.activities[0].durationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);

  const currentActivity = loop.activities[currentActivityIndex];
  const totalSeconds = currentActivity.durationMinutes * 60;
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          // Move to next activity
          if (currentActivityIndex < loop.activities.length - 1) {
            const nextIndex = currentActivityIndex + 1;
            setCurrentActivityIndex(nextIndex);
            toast.success(`${currentActivity.name} completed!`, {
              description: `Starting: ${loop.activities[nextIndex].name}`
            });
            return loop.activities[nextIndex].durationMinutes * 60;
          } else {
            // Loop completed
            toast.success("Loop completed! 🎉", {
              description: "Great work!"
            });
            onClose();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, currentActivityIndex, loop.activities, currentActivity.name, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSkip = () => {
    if (currentActivityIndex < loop.activities.length - 1) {
      const nextIndex = currentActivityIndex + 1;
      setCurrentActivityIndex(nextIndex);
      setRemainingSeconds(loop.activities[nextIndex].durationMinutes * 60);
      toast.info("Activity skipped");
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">{loop.name}</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-8">
          {/* Timer Display */}
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-card flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-foreground mb-2">
                      {formatTime(remainingSeconds)}
                    </div>
                    <div className="text-muted-foreground">remaining</div>
                  </div>
                </div>
              </div>
              <svg className="absolute inset-0 w-64 h-64 mx-auto -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progress * 7.54} 754`}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-semibold text-foreground">
                {currentActivity.name}
              </h3>
              <p className="text-muted-foreground">
                Activity {currentActivityIndex + 1} of {loop.activities.length}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsPaused(!isPaused)}
              size="lg"
              className="w-32"
            >
              {isPaused ? (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              )}
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              size="lg"
            >
              <SkipForward className="w-5 h-5 mr-2" />
              Skip
            </Button>
          </div>

          {/* Activities Progress */}
          <div className="space-y-3">
            {loop.activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  index === currentActivityIndex
                    ? "bg-primary/10 border border-primary/20"
                    : index < currentActivityIndex
                    ? "bg-muted/50 opacity-50"
                    : "bg-card/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    index === currentActivityIndex
                      ? "bg-primary text-primary-foreground"
                      : index < currentActivityIndex
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium">{activity.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{activity.durationMinutes}m</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
