import style from './[id].module.css';
import {GetStaticPropsContext, InferGetServerSidePropsType} from "next";
import fetchOneMovie from "@/lib/fetch-one-movies";
import {MovieData} from "@/types";
import {Head} from "next/document";
import fetchMovies from "@/lib/fetch-movies";

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const movie: MovieData | null = await fetchOneMovie(Number(id));

    return {
        props: {
            movie,
        }
    }
}

export const getStaticPaths = async () => {
    const movies = await fetchMovies();
    return {
        path: movies.map((movie) => (
            {
                params: {id: movie.id.toString()},
                fallback: "blocking",
            }
        ))
    };
}

export default function Page({movie}: InferGetServerSidePropsType<typeof getStaticProps>) {
    if (!movie) return <div>영화 정보가 없습니다.</div>;

    const {
        title,
        subTitle,
        company,
        runtime,
        description,
        posterImgUrl,
        releaseDate,
        genres,
    } = movie;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={posterImgUrl}/>
                <meta property="og:title" content={title}/>
                <meta
                    property="og:description"
                    content={description}
                />
            </Head>
            <div className={style.container}>
                <div
                    className={style.background_img_container}
                    style={{backgroundImage: `url('${posterImgUrl}')`}}
                >
                    <img src={posterImgUrl} alt={title}/>
                </div>

                <div className={style.info_container}>
                    <div>
                        <div>{title}</div>
                        <div>
                            {releaseDate} / {genres.join(", ")} / {runtime}분
                        </div>
                        <div>{company}</div>
                    </div>
                    <div>
                        <div className={style.subTitle}>{subTitle}</div>
                        <div className={style.description}>{description}</div>
                    </div>
                </div>
            </div>
        </>
    );
}