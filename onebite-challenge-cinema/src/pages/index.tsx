import SearchBar from "@/components/Search-bar";
import MovieItem from "@/components/Movie-item";
import movies from "@/dummy.json";
import style from './index.module.css';

export default function Home() {
    return (
        <div className={style.container}>
            <SearchBar/>
            <div>
                <div>지금 가장 추천하는 영화</div>
                <div className={style.reco_container}>
                    {movies.slice(0, 3).map((movie) => (
                        <MovieItem key={`recomovie-${movie.id}`} {...movie} />
                    ))}
                </div>
            </div>
            <div>
                <div>등록된 모든 영화</div>
                <div className={style.all_container}>
                    {movies.map((movie) => (
                        <MovieItem key={`movie-${movie.id}`} {...movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}
