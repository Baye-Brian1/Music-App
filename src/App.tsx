import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import AlbumGrid from "@/components/ui/AlbumGrid"; // your Day 1 library screen
import Browse from "@/components/Browse";
import NowPlaying from "./components/NowPlaying";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AlbumGrid />} />
        <Route path="/play" element={<NowPlaying />} />
        <Route path="/browse" element={<Browse />} />
      </Route>
    </Routes>
  );
}

export default App;