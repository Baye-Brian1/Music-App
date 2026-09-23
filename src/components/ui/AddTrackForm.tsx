import { useState } from "react";
import type { SubmitEvent } from "react";
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
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Track name"
        />
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
           placeholder="3:45"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
export default AddTrackForm;
