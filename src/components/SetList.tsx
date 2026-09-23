import { useState } from "react";
import type { SetTrack} from "@/data/setTracks"
import {initialSet} from "@/data/setTracks"
import AddTrackForm from "./ui/AddTrackForm";
import SetSummary from "./SetSummary";

function SetList() {
    const [setTracks, setSetTracks]= useState<SetTrack[]>(initialSet);
    function removeTrack(id: string){
        setSetTracks((prev)=> prev.filter(track=> track.id !== id))
    }
    function addTrack(title: string, duration: string){
        const newTrack: SetTrack={
            id: crypto.randomUUID(),
            title,
            duration
        }
        setSetTracks((prev)=> [...prev, newTrack])
    }
 
    return(
        <div className="min-h-screen bg-[#fafaf8] text-black p-10">
            <h1 className="text-4xl font-display font-medium mb-8">Build a setlist</h1>
            <p>Tracks in set: {setTracks.length}</p>
            {setTracks.map((track)=>(
                <div key={track.id} className="flex items-center justify-between border-b border-[#dcd8cc] py-3">
                    <span className="text-sm font-medium">{track.title}</span>
                    <span className="font-mono text-xs text-neutral-600">{track.duration}</span>
                    <button onClick={()=> removeTrack(track.id)}>remove</button>
                </div>
            ))}
            <AddTrackForm onAdd={addTrack}/>
            <SetSummary tracks={setTracks}/>
        </div>
    );
}

export default SetList;