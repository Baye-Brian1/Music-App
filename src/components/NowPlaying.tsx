import { useMusic } from "@/context/useMusic";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import type { ChangeEvent } from "react";

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${String(sec).padStart(2, "0")}`;
}
function NowPlaying() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    currentTime,
    duration,
    audioRef,
  } = useMusic();
  if (!currentTrack) {
    return (
      <p className="text-neutral-500 p-10">
        Nothing's playing yet — pick a track from Browse.
      </p>
    );
  }
  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = time;
  };
  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center p-10">
      <div
        className="w-50 h-50 aspect-square rounded border border-[#dcd8cc] mb-8 bg-[#f1efe9] relative overflow-hidden"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 50%, transparent 0 6px, rgba(10, 10, 10, 0.05) 6px 7px)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/5 aspect-square rounded-full bg-[#fafaf8] border-[#dcd8cc] flex justify-center items-center">
            <div className="w-2/5 aspect-square rounded-full bg-[#0a0a0a]"></div>
          </div>
        </div>
      </div>

      <h1 className="font-display text-2xl font-medium mt-10">
        {currentTrack.title}
      </h1>

      <div className="w-full max-w-6xl mx-auto px-7 mt-3">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 accent-black"
        />
        <div className="flex justify-between text-xs font-mono text-neutral-500 mt-1">
          <div>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button onClick={playPrev} className="cursor-pointer">
          <SkipBack className="w-6 h-6" />
        </button>
        <button
          onClick={togglePlay}
          className="bg-black cursor-pointer text-white rounded-full p-4"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button onClick={playNext} className="cursor-pointer">
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default NowPlaying;
