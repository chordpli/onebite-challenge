import {MovieData} from "@/types";

export default async function fetchRandomMovies(): Promise<MovieData[]> {
    const url = "http://localhost:12345/movie/random";

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (err) {

        console.log(err);
        return [];
    }

};