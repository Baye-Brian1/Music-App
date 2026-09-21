 export interface Track{
    id: number;
    title: string;
    artist: string;
    duration: string;
    genre: "slow-burn" | "late-night" | "driving" | "live"
 }

 export const tracks: Track[]=[
    {id: 1, title: "Late Night Static", artist: "Marlow", duration: "3:50", genre:"late-night"},
    {id: 2, title: "Undertow", artist: "Fen Row", duration: "5:40", genre:"slow-burn"},
    {id: 3, title: "Halflight", artist: "Coast Blue", duration: "2:59", genre:"slow-burn"},
    {id: 4, title: "Slow Weather", artist: "Marlow", duration: "4:12", genre:"driving"},
    {id: 5, title: "Paper Moths", artist: "Ines Kade", duration: "6:03", genre:"late-night"},
    {id: 6, title: "Interior", artist: "Fen Row", duration: "4:21", genre:"driving"},
 ]