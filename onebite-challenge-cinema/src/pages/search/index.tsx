import SearchBar from "@/components/Search-bar";
import MovieItem from "@/components/Movie-item";
import style from './index.module.css';
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchMovies from "@/lib/fetch-movies";


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
