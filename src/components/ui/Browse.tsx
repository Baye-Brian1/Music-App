import { useState } from "react";
import { tracks } from "@/data/tracks";

function Browse() {
  const [search, setSearch] = useState("");

  const filtered = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#fafaf8] p-10 text-black">
      <h1 className="text-4xl font-display mb-8 font-medium">Browse tracks</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by track name or artist..."
        className="w-full max-w-md border border-neutral-300 bg-neutral-100 rounded px-3 py-2 mb-8"
      />
      {filtered.length === 0? (
        <p className="text-neutral-500">No tracks or artist match "{search}".</p>
      ):(
        <table className="w-full">
            <thead>
                <tr className="text-left text-xs font-mono text-neutral-500 border-b border-neutral-300">
                    <th className="pb-2">No</th>
                    <th className="pb-2">Track</th>
                    <th className="pb-2 text-right">Time</th>
                </tr>
            </thead>
            <tbody>
                {filtered.map((track, index)=>(
                    <tr className="border border-neutral-200" key={track.id}>
                        <td className="py-3 font-mono text-neutral-500">{String(index+1).padStart(2, "0")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}
    </div>
  );
}
