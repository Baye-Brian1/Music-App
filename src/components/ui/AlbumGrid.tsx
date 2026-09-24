import { useNavigate } from "react-router-dom";
import AlbumCard from "./AlbumCard";
import { useMusic } from "@/context/useMusic";

function AlbumGrid() {
    const {tracks, playTrack}= useMusic();
    const navigate= useNavigate()
    if (tracks.length===0) {
        return <p className="text-neutral-500 p-10">No songs uploaded yet — add some from Browse.</p>;
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
