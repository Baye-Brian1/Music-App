import { createContext, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";

interface Track {
  id: string;
  title: string;
  url: string;
  file: File;
}

interface MusicContextType {
  tracks: Track[];
  addTracks: (files: FileList) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
  return (
    <MusicContext.Provider
      value={{
        tracks,
        addTracks,
        togglePlay,
        playTrack,
        isPlaying,
        currentTrack,
        audioRef,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}
