import {useEffect, useState} from "react";
import SearchBar from "@/components/Search-bar";
import MovieItem from "@/components/Movie-item";
import style from './index.module.css';
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import {InferGetStaticPropsType} from "next";
import {MovieData} from "@/types";
import {Head} from "next/document";

export const getStaticProps = async () => {
    const recoMovies = await fetchRandomMovies();
    const allMovies = await fetchMovies();

    return {
        props: {
            allMovies,
            recoMovies,
        },
        revalidate: 10,
    };
};

export default function Home({allMovies, recoMovies}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <Head>
                <title>한입 씨네마</title>
                <meta property="og:image" content="/thumbnail.png"/>
                <meta property="og:title" content="한입 씨네마"/>
                <meta
                    property="og:description"
                    content="한입 씨네마 영화"
                />
            </Head>
            <div className={style.container}>
                <SearchBar/>
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
        </>
    );
};
