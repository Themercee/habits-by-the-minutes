import { Loop } from "@/types/loop";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pencil, Trash2, Clock } from "lucide-react";

interface LoopCardProps {
  loop: Loop;
  onStart: (loop: Loop) => void;
  onEdit: (loop: Loop) => void;
  onDelete: (loopId: string) => void;
}

export const LoopCard = ({ loop, onStart, onEdit, onDelete }: LoopCardProps) => {
  const totalMinutes = loop.activities.reduce((sum, activity) => sum + activity.durationMinutes, 0);
  
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-border/50">
      <div className="flex flex-col space-y-4 overflow-hidden h-full">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">{loop.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>{totalMinutes} minutes total</span>
              <span className="text-muted-foreground/60">•</span>
              <span>{loop.activities.length} activities</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 flex-grow">
          {loop.activities.map((activity, index) => (
            <div key={activity.id} className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <span className="text-foreground">{activity.name}</span>
              </div>
              <span className="text-muted-foreground font-medium">{activity.durationMinutes}m</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Button onClick={() => onStart(loop)} className="flex-1 w-32" size="lg">
            <Play className="w-4 h-4 mr-2" />
            Start Loop
          </Button>
          <Button onClick={() => onEdit(loop)} className="flex-none w-12" variant="outline" size="lg">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button onClick={() => onDelete(loop.id)} className="flex-none w-12" variant="outline" size="lg">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
