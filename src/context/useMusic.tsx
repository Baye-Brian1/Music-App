import { useContext } from "react";
import { MusicProvider } from "./MusicContext";

export function useMusic(){
    const ctx = useContext(MusicProvider);
    if(!ctx) throw new Error("useMusic must be used inside Music Provider");
    return ctx;
}