import {useRouter} from "next/router";
import SearchBar from "@/components/Search-bar";
import movies from "@/dummy.json";
import MovieItem from "@/components/Movie-item";
import {MovieData} from "@/types";
import style from './index.module.css';

export default function Page() {

    const router = useRouter();
    const {q} = router.query;

    return (
        <div>
            <SearchBar/>
            {q && (
                <div className={style.search_container}>
                    {movies.filter(
                        (movie: MovieData) => movie.title.includes(q as string)
                    ).map((movie) => (
                        <MovieItem key={movie.id} {...movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
