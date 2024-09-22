import {useEffect, useState} from "react";
import SearchBar from "@/components/Search-bar";
import MovieItem from "@/components/Movie-item";
import style from './index.module.css';
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import {InferGetStaticPropsType} from "next";
import {MovieData} from "@/types";

export const getStaticProps = async () => {
    // 빌드 시 추천 영화 데이터 가져오기
    const recoMovies = await fetchRandomMovies();

    return {
        props: {
            recoMovies,
        },
    };
};

export default function Home({ recoMovies }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [allMovies, setAllMovies] = useState<MovieData[]>([]);

    useEffect(() => {
        // 클라이언트에서 모든 영화 데이터 가져오기
        const fetchAllMovies = async () => {
            const movies = await fetchMovies();
            setAllMovies(movies);
        };

        fetchAllMovies();
    }, []);

    return (
        <div className={style.container}>
            <SearchBar />
            <div>
                <div>지금 가장 추천하는 영화</div>
                <div className={style.reco_container}>
                    {recoMovies.map((movie: MovieData) => (
                        <MovieItem key={`recomovie-${movie.id}`} {...movie} />
                    ))}
                </div>
            </div>
            <div>
                <div>등록된 모든 영화</div>
                <div className={style.all_container}>
                    {allMovies.length > 0 ? (
                        allMovies.map((movie) => (
                            <MovieItem key={`movie-${movie.id}`} {...movie} />
                        ))
                    ) : (
                        <p>로딩 중...</p>
                    )}
                </div>
            </div>
        </div>
    );
};
