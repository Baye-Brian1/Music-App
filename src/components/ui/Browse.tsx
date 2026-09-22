import { useState, SubmitEvent } from "react";
import { tracks } from "@/data/tracks";
import type { Track } from "@/data/tracks";

function Browse() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<"all" | Track["genre"]>("all");
  const [requestText, setRequestText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "all" || track.genre === genre;
    return matchesSearch && matchesGenre;
  });
  const genres: Array<"all" | Track["genre"]> = [
    "all",
    "slow-burn",
    "late-night",
    "driving",
    "live",
  ];
  const genreLabels: Record<Track["genre"] | "all", string> = {
    all: "All",
    "slow-burn": "Slow burn",
    "late-night": "Late night",
    driving: "Driving",
    live: "Live takes",
  };
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setRequestText("");
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] p-10 text-black">
      <div className="max-w-3xl">
        <div className="flex items-start justify-between gap-6 flex-wrap mb-8">
          <h1 className="text-4xl font-display font-medium">Browse tracks</h1>

          <form onSubmit={handleSubmit} className="mt-10 flex max-w-md gap-2">
            <input
              type="text"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="Request a track we dont have..."
              className="flex-1 border border-neutral-300 outline-0 cursor-pointer bg-white rounded px-3 py-2"
            />
            <button
              type="submit"
              className="bg-[#0a0a0a] cursor-pointer text-white px-4 py-2 rounded text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              Send
            </button>
          </form>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by track name or artist..."
          className="w-full max-w-md border border-neutral-300 bg-[#f1efe9] rounded px-3 py-2 mb-8 outline-0"
        />
        <div className="flex gap-2 mb-6">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`text-sm px-3 py-1.5 rounded-full cursor-pointer border transition-all
                ${
                  genre === g
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                    : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
                } `}
            >
              {genreLabels[g]}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="text-neutral-500">
            No tracks or artist match "{search}".
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs  font-mono text-neutral-500 border-b border-[#dcd8cc]">
                <th className="pb-3 px-2">No</th>
                <th className="pb-3">Track</th>
                <th className="pb-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((track, index) => (
                <tr
                  className="border-b border-neutral-300 hover:bg-[#f1efe9] cursor-pointer"
                  key={track.id}
                >
                  <td className="py-3 px-2 font-mono text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3">
                    <p className="font-medium">{track.title}</p>
                    <p className="text-xs text-neutral-500">{track.artist}</p>
                  </td>
                  <td className="py-3 tabular-nums text-right font-mono text-neutral-600">
                    {track.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {submitted && (
          <p className="text-sm text-neutral-500 mt-2">
            Thanks we'll look into it
          </p>
        )}
      </div>
    </div>
  );
}

export default Browse;
