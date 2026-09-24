import { useRef, useState, useEffect } from "react";
import { MusicContext } from "./useMusic";
import type { ReactNode } from "react";

export interface Track {
  id: string;
  title: string;
  url: string;
  file: File;

}

export interface MusicContextType {
  tracks: Track[];
  addTracks: (files: FileList) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  playNext: () => void;
  playPrev: () => void;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  function addTracks(files: FileList) {
    const newTracks: Track[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      url: URL.createObjectURL(file),
      file,
    }));
    setTracks((prev) => [...prev, ...newTracks]);
  }

  function playTrack(track: Track) {
    setCurrentTrack(track);
    setIsPlaying(true);
  }
  function togglePlay() {
    setIsPlaying((prev) => !prev);
  }
  function playNext() {
    if (!currentTrack) return;
    const index = tracks.findIndex((t) => t.id === currentTrack.id);
    const next = tracks[index + 1];
    if (next) playTrack(next);
  }
  function playPrev() {
    if (!currentTrack) return;
    const index = tracks.findIndex((t) => t.id === currentTrack.id);
    const prev = tracks[index - 1];
    if (prev) playTrack(prev);
  }
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    function updateTime() {
      setCurrentTime(audio!.currentTime);
    }
    function updateDuration() {
      setDuration(audio!.duration);
    }
    function handledEnded(){
        playNext();
    }
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handledEnded)
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentTrack, audioRef]);
  return (
    <MusicContext.Provider
      value={{
        tracks,
        addTracks,
        togglePlay,
        playTrack,
        playNext,
        playPrev,
        isPlaying,
        currentTrack,
        currentTime,
        duration,
        audioRef,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
