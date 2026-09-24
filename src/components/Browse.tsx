import { useState, type SubmitEvent } from "react";
import { tracks } from "@/data/tracks";
import type { Track } from "@/data/tracks";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

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
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] p-10 text-black">
      <div className="max-w-6xl py-4 px-6 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
        <div>
          <h1 className="text-4xl font-display font-medium">Browse tracks</h1>

          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by track name or artist..."
            className="w-full text-[15px] max-w-2xl border border-neutral-300 bg-[#f1efe9] rounded px-3 py-4 mt-3 mb-4 outline-0"
          />
          <div className="flex gap-2 mb-6">
            {genres.map((g) => (
              <Button
                key={g}
                onClick={() => setGenre(g)}
                className='cursor-pointer'
                
                variant={genre === g? "default":"outline"}
              >
                {genreLabels[g]}
              </Button>
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
        </div>
        <div className="sticky top-10 border border-[#dcd8cc] rounded-lg bg-[#f1efe9] p-5">
          <h3 className="font-display text-lg font-medium mb-2">
            Can't find your track?
          </h3>
          <p className="text-xs text-neutral-600 mb-4">
            Tell us what's missing and we'll try to look into it.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              type="text"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="Track or artist name..."
              required
              className="border border-neutral-300 outline-0 bg-white rounded px-3 py-2 text-sm"
            />
            <Button
              type="submit"
              variant="default"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 right-6 bg-black text-white text-sm px-4 py-3 rounded-md shadow-lg flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Thanks — we'll look into it.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Browse;
