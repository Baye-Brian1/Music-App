import { useState, type SubmitEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "./ui/input";
import { buttonVariants } from "./ui/button";
import { Check } from "lucide-react";
import { useMusic } from "@/context/useMusic";
import type { ChangeEvent } from "react";
import { Play, Pause } from "lucide-react";

function Browse() {
  const { tracks, addTracks, isPlaying, togglePlay, currentTrack, playTrack } =
    useMusic();
  const [search, setSearch] = useState("");
  const [requestText, setRequestText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addTracks(e.target.files);
    }
  };
  const filtered = tracks.filter((track) => {
    const matchesSearch = track.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
  });

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
          <Input
            type="file"
            accept="audio/*"
            multiple
            onChange={handleUpload}
            className="mb-6 text-sm"
          />

          {tracks.length === 0 ? (
            <p className="text-neutral-500">
              No tracks uploaded yet add some above.
            </p>
          ) : (
            <table className="w-full">
              <tbody>
                {tracks.map((track, index) => {
                  const isCurrentTrack = currentTrack?.id === track.id;
                  return (
                    <tr
                      key={track.id}
                      onClick={() =>
                        isCurrentTrack ? togglePlay() : playTrack(track)
                      }
                      className="border-b border-neutral-300 hover:bg-[#f1efe9] cursor-pointer"
                    >
                      <td className="py-3 px-2 font-mono text-neutral-500">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3 font-medium">
                        {track.title}
                        {isCurrentTrack && isPlaying && (
                          <span className="ml-2 text-xs text-neutral-500">
                            <Play className="w-4 h-4"/>Playing
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="sticky top-10 mt-14 border border-[#dcd8cc] rounded-lg bg-[#f1efe9] p-5">
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
            <button
              type="submit"
              className={buttonVariants({ variant: "default" })}
            >
              Send
            </button>
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
            Thanks! we'll look into it.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Browse;
