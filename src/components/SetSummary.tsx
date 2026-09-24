import type { SetTrack } from "@/data/setTracks";

interface SetSummaryProps{
    tracks: SetTrack[];
}

function SetSummary({tracks}: SetSummaryProps) {
    function toSeconds(duration: string): number{
        const [min, sec]= duration.split(":").map(Number)
        return min*60+sec
    }
    function toDurationString(totalSeconds: number):string{
        const min= Math.floor(totalSeconds/60);
        const sec= totalSeconds % 60;

        return `${min}:${String(sec).padStart(2, "0")}`
    }
    const totalSeconds= tracks.reduce((sum, track)=> sum+toSeconds(track.duration), 0)
    return(
        <div className="flex flex-col gap-2 mt-3">
            <p className="px-2 ">Total tracks: {tracks.length}</p>
            <p className="border  border-[#dcd8cc]"></p>
            <p className="px-2 ">Tracks length: {toDurationString(totalSeconds)}</p>
        </div>
    );
}

export default SetSummary