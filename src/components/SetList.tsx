import { useState } from "react";
import type { SetTrack} from "@/data/setTracks"
import {initialSet} from "@/data/setTracks"

function SetList() {
    const [setTracks, setSetTracks]= useState<SetTrack[]>(initialSet);
    function removeTrack(id: string){
        setSetTracks((prev)=> prev.filter(track=> track.id !== id))
    }

    return(
        <div>
            <p>Tracks in set: {setTracks.length}</p>
        </div>
    );
}

export default SetList;