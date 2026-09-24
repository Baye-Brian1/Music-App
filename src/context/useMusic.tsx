import { useContext, createContext } from "react";
import type { MusicContextType } from "./MusicContext";

export const MusicContext = createContext<MusicContextType | null>(null);
export function useMusic(){
    const ctx = useContext(MusicContext);
    if(!ctx) throw new Error("useMusic must be used inside Music Provider");
    return ctx;
}