import { useState } from "react";
import type { SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface AddTrackFormProps {
  onAdd: (title: string, duration: string) => void;
}

function AddTrackForm({ onAdd }: AddTrackFormProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!title.trim() || !duration.trim()) return;
    onAdd(title, duration)
    setTitle("");
    setDuration("")
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Track name"
        />
        <Input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
           placeholder="3:45"
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}
export default AddTrackForm;
