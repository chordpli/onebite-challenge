import SearchBar from "@/components/Search-bar";
import MovieItem from "@/components/Movie-item";
import style from './index.module.css';
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchMovies from "@/lib/fetch-movies";
import {Head} from "next/document";


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const q = context.query.q as string;

    const searchMovies = await fetchMovies(q);

    return {
        props: {
            searchMovies,
        }
    }
}

export default function Page({searchMovies}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <div>
            <Head>
                <title>한입 씨네마- 검색 결과</title>
                <meta property="og:image" content="/thumbnail.png"/>
                <meta property="og:title" content="한입 씨네마"/>
                <meta
                    property="og:description"
                    content="한입 씨네마 영화"
                />
            </Head>
            <SearchBar/>
            {searchMovies && (
                <div className={style.search_container}>
                    {searchMovies.map((movie) => (
                        <MovieItem key={movie.id} {...movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
