import type { Album } from "@/data/albums";

interface AlbumCardProps {
  album: Album;
}

function AlbumCard({ album }: AlbumCardProps) {
  return(
    <div>
    <div
      className="aspect-square rounded border border-neutral-300 bg-neutral-100 relative overflow-hidden"
      style={{
        backgroundImage:
          "repeating-radial-gradient(circle 50% 50%, transparent 0 6px, rgba(10, 10, 10, 0.05)6px 7px)"
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/5 aspect-square rounded-full bg-white border-neutral-300 flex justify-center items-center">
          <div className="w-2/5 aspect-square rounded-full bg-black"></div>
        </div>
      </div>
    </div>
    <div className="pt-3">
        <p className="text-lg font-medium">{album.name}</p>
        <p className="text-sm text-neutral-600 mt-0.5">{album.artist}</p>
        <span className="inline-block text-[10px] font-mono mt-2 text-neutral-500 border border-neutral-300 rounded-full px-2 py-0.5">{album.tag}</span>
    </div>
  </div>
  );
}
export default AlbumCard;