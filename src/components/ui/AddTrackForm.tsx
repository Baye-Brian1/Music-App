import { useState } from "react";
import type { SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";
interface AddTrackFormProps {
  onAdd: (title: string, duration: string) => void;
}

function AddTrackForm({ onAdd }: AddTrackFormProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !duration.trim()) return;
    onAdd(title, duration);
    setTitle("");
    setDuration("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Track name"
          className="border border-neutral-300 outline-0 bg-white rounded px-3 py-2 text-sm"
        />
        <Input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="3:45"
          className="border border-neutral-300 outline-0 bg-white rounded px-3 py-2 text-sm"
        />
        <Button type="submit" variant="default" className="cursor-pointer w-full py-3">
          Add
        </Button>
      </form>
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed right-6 bottom-6 bg-black text-sm px-4 py-3 flex items-center rounded-md shadow-lg gap-2 text-white"
          >
            <CheckCircle className="w-4 h-4" />
            Added a New Track
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default AddTrackForm;
