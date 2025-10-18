import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Loop, Activity } from "@/types/loop";

interface CreateLoopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (loop: Loop) => void;
  editingLoop?: Loop | null;
}

export const CreateLoopDialog = ({ open, onOpenChange, onSave, editingLoop }: CreateLoopDialogProps) => {
  const [loopName, setLoopName] = useState("");
  const [activities, setActivities] = useState<Activity[]>([
    { id: crypto.randomUUID(), name: "", durationMinutes: 25 }
  ]);

  useEffect(() => {
    if (editingLoop) {
      setLoopName(editingLoop.name);
      setActivities(editingLoop.activities);
    } else {
      setLoopName("");
      setActivities([{ id: crypto.randomUUID(), name: "", durationMinutes: 25 }]);
    }
  }, [editingLoop, open]);

  const addActivity = () => {
    setActivities([...activities, { id: crypto.randomUUID(), name: "", durationMinutes: 25 }]);
  };

  const removeActivity = (id: string) => {
    if (activities.length > 1) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  const updateActivity = (id: string, field: keyof Activity, value: string | number) => {
    setActivities(activities.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const handleSave = () => {
    if (!loopName.trim() || activities.some(a => !a.name.trim() || a.durationMinutes <= 0)) {
      return;
    }

    const loop: Loop = {
      id: editingLoop?.id || crypto.randomUUID(),
      name: loopName,
      activities,
      createdAt: editingLoop?.createdAt || new Date().toISOString()
    };

    onSave(loop);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingLoop ? "Edit Loop" : "Create New Loop"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="loop-name">Loop Name</Label>
            <Input
              id="loop-name"
              placeholder="e.g., Working Loop"
              value={loopName}
              onChange={(e) => setLoopName(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Activities</Label>
              <Button onClick={addActivity} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>
            
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex gap-3 items-start p-4 rounded-lg border bg-card">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label htmlFor={`activity-name-${activity.id}`} className="text-xs">Activity Name</Label>
                      <Input
                        id={`activity-name-${activity.id}`}
                        placeholder="e.g., Dev work"
                        value={activity.name}
                        onChange={(e) => updateActivity(activity.id, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`activity-duration-${activity.id}`} className="text-xs">Duration (minutes)</Label>
                      <Input
                        id={`activity-duration-${activity.id}`}
                        type="number"
                        min="1"
                        value={activity.durationMinutes}
                        onChange={(e) => updateActivity(activity.id, "durationMinutes", parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>
                  {activities.length > 1 && (
                    <Button
                      onClick={() => removeActivity(activity.id)}
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editingLoop ? "Save Changes" : "Create Loop"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
