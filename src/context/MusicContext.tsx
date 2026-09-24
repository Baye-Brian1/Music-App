import { useRef, useState } from "react";
import { MusicContext } from "./useMusic";
import type { ReactNode } from "react";

interface Track {
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
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}



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
  function playNext() {
    if (!currentTrack) return 
    const index= tracks.findIndex((t)=> t.id=== currentTrack.id)
    const next= tracks[index+1];
    if (next) playTrack(next)
  }
function playPrev() {
    if (!currentTrack) return 
    const index= tracks.findIndex((t)=> t.id=== currentTrack.id)
    const prev= tracks[index-1];
    if (prev) playTrack(prev)
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


