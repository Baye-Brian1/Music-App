import AlbumCard from "./components/ui/AlbumCard"
import { albums } from "./data/albums"

function App() {
  return(
    <div className="min-h-screen bg-[#fafaf8] text-black p-10">
      <h1 className="text-4xl font-semibold font-display mb-8">Wax</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album)=> (
          <AlbumCard key={album.name} album={album}/>
          ))}
      </div>
    </div>
  )
}  
export default App
