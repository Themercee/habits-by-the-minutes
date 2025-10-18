import { useState, useEffect } from "react";
import { Loop } from "@/types/loop";
import { getLoops, addLoop, updateLoop, deleteLoop } from "@/lib/storage";
import { LoopCard } from "@/components/LoopCard";
import { CreateLoopDialog } from "@/components/CreateLoopDialog";
import { TimerView } from "@/components/TimerView";
import { Button } from "@/components/ui/button";
import { Plus, Clock } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [loops, setLoops] = useState<Loop[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLoop, setEditingLoop] = useState<Loop | null>(null);
  const [activeLoop, setActiveLoop] = useState<Loop | null>(null);

  useEffect(() => {
    setLoops(getLoops());
  }, []);

  const handleSaveLoop = (loop: Loop) => {
    if (editingLoop) {
      updateLoop(loop);
      toast.success("Loop updated successfully!");
    } else {
      addLoop(loop);
      toast.success("Loop created successfully!");
    }
    setLoops(getLoops());
    setEditingLoop(null);
  };

  const handleEditLoop = (loop: Loop) => {
    setEditingLoop(loop);
    setIsDialogOpen(true);
  };

  const handleDeleteLoop = (loopId: string) => {
    deleteLoop(loopId);
    setLoops(getLoops());
    toast.success("Loop deleted successfully!");
  };

  const handleStartLoop = (loop: Loop) => {
    setActiveLoop(loop);
  };

  const handleCloseTimer = () => {
    setActiveLoop(null);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Loop Timer
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create and manage your habit loops. Build productive routines with timed activities.
            </p>
          </div>

          {/* Create Button */}
          <div className="mb-8 flex justify-center">
            <Button
              onClick={() => {
                setEditingLoop(null);
                setIsDialogOpen(true);
              }}
              size="lg"
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Loop
            </Button>
          </div>

          {/* Loops Grid */}
          {loops.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No loops yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Create your first habit loop to get started
              </p>
              <Button
                onClick={() => {
                  setEditingLoop(null);
                  setIsDialogOpen(true);
                }}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Loop
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loops.map(loop => (
                <LoopCard
                  key={loop.id}
                  loop={loop}
                  onStart={handleStartLoop}
                  onEdit={handleEditLoop}
                  onDelete={handleDeleteLoop}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <CreateLoopDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveLoop}
        editingLoop={editingLoop}
      />

      {/* Timer View */}
      {activeLoop && (
        <TimerView loop={activeLoop} onClose={handleCloseTimer} />
      )}
    </>
  );
};

export default Index;
