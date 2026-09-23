import { useState } from "react";
import type { SetTrack } from "@/data/setTracks";
import { initialSet } from "@/data/setTracks";
import AddTrackForm from "./ui/AddTrackForm";
import SetSummary from "./SetSummary";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, X } from "lucide-react";

function SetList() {
  const [setTracks, setSetTracks] = useState<SetTrack[]>(initialSet);
  function removeTrack(id: string) {
    setSetTracks((prev) => prev.filter((track) => track.id !== id));
  }
  function addTrack(title: string, duration: string) {
    const newTrack: SetTrack = {
      id: crypto.randomUUID(),
      title,
      duration,
    };
    setSetTracks((prev) => [...prev, newTrack]);
  }
  function moveTrack(index: number, direction: "up" | "down") {
    setSetTracks((prev) => {
      const next = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] text-black p-10">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-display font-medium mb-8">
          Build a setlist
        </h1>
        <p>Tracks in set: {setTracks.length}</p>
        {setTracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center gap-3 border-b border-[#dcd8cc] hover:bg-[#f1efe9] cursor-pointer py-3"
          >
            <div className="flex flex-col">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => moveTrack(index, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => moveTrack(index, "down")}
                disabled={index === setTracks.length - 1}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </div>
            <span className="flex-1 text-sm font-medium">{track.title}</span>
            <span className="font-mono text-xs text-neutral-600">
              {track.duration}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => removeTrack(track.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <AddTrackForm onAdd={addTrack} />
        <SetSummary tracks={setTracks} />
      </div>
    </div>
  );
}

export default SetList;
