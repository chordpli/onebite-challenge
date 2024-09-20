import SearchBar from "@/components/Search-bar";
import MovieItem from "@/components/Movie-item";
import style from './index.module.css';
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-books";
import {InferGetServerSidePropsType} from "next";

export const getServerSideProps = async () => {
    const [allMovies, recoMovies] =
        await Promise.all([
            fetchMovies(),
            fetchRandomMovies()
        ]);

    return {
        props: {
            allMovies,
            recoMovies,
        },
    };
};


export default function Home({allMovies, recoMovies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className={style.container}>
            <SearchBar/>
            <div>
                <div>지금 가장 추천하는 영화</div>
                <div className={style.reco_container}>
                    {recoMovies.map((movie) => (
                        <MovieItem key={`recomovie-${movie.id}`} {...movie} />
                    ))}
                </div>
            </div>
            <div>
                <div>등록된 모든 영화</div>
                <div className={style.all_container}>
                    {allMovies.map((movie) => (
                        <MovieItem key={`movie-${movie.id}`} {...movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};
