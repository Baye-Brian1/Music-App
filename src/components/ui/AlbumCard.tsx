import type { Track } from "@/context/MusicContext"
import { formatTime } from "@/lib/formatTime";

interface AlbumCardProps {
  track: Track;
  onClick?: ()=> void
}

function AlbumCard({ track, onClick }: AlbumCardProps) {
  return(
    <div onClick={onClick} className="cursor-pointer group">
    <div
      className="aspect-square rounded border border-[#dcd8cc] bg-[#f1efe9] relative overflow-hidden"
      style={{
        backgroundImage:
          "repeating-radial-gradient(circle at 50% 50%, transparent 0 6px, rgba(10, 10, 10, 0.05) 6px 7px)"
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/5 aspect-square rounded-full bg-[#fafaf8] border-[#dcd8cc] flex justify-center items-center">
          <div className="w-2/5 aspect-square rounded-full bg-[#0a0a0a]"></div>
        </div>
      </div>
    </div>
    <div className="pt-3">
        <p className="text-lg font-medium font-display">{track.title}</p>
        <p className="text-sm font-sans text-neutral-600 mt-0.5">{formatTime(track.duration)}</p>
    </div>
  </div>
  );
}
export default AlbumCard;