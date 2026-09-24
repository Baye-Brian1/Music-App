import { useMusic } from "@/context/useMusic";
interface AddTrackFormProps {
  onAdd: (title: string, duration: string) => void;
  excludeIds: string[];
}

function AddTrackForm({ onAdd, excludeIds }: AddTrackFormProps) {
  const { tracks } = useMusic();
  const available = tracks.filter((t) => !excludeIds.includes(t.id));

  return (
    <div className="flex flex-col gap-2">
      {available.map((track) => (
        <button
          key={track.id}
          onClick={() => onAdd(track.title, track.duration)}
          className="text-left text-sm border border-neutral-300 rounded px-3 py-2 hover:bg-white transition-colors"
        >
          {track.title}
        </button>
      ))}
    </div>
  );
}
export default AddTrackForm;
