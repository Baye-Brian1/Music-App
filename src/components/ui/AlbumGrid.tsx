import { useNavigate } from "react-router-dom";
import AlbumCard from "./AlbumCard";
import { useMusic} from "@/context/useMusic";
import { Music } from "lucide-react";

function AlbumGrid() {
    const {tracks, playTrack}= useMusic();
    const navigate= useNavigate()
    if (tracks.length===0) {
        return(
           <div className="min-h-screen w-full flex items-center justify-center bg-[#fafaf8] p-6">
            <div className="flex flex-col items-center justify-center text-center py-30 border border-dashed border-neutral-300 rounded-lg w-full max-w-4xl bg-[#f5f3ed]/50">
              <div className="w-12 h-12 rounded-full bg-neutral-200/60 flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-neutral-500" />
              </div>
              <h3 className="font-medium text-base mb-1">No tracks found</h3>
              <p className="text-sm text-neutral-500 max-w-xs">
                No tracks uploaded yet. Use the sidebar to add some above.  
              </p>
            </div>
          </div>

        ); 
    }
  return (
    <div className="min-h-screen max-w-6xl mx-auto bg-[#fafaf8] text-black px-6 py-10">
      <h1 className="text-4xl font-semibold font-display mb-8">wax</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {tracks.map((track) => (
          <AlbumCard key={track.id} track={track} onClick={()=>{
            navigate("/play")
             playTrack(track)
            }}/>
        ))}
      </div>
    </div>
  );
}

export default AlbumGrid;
