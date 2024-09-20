import {useRouter} from "next/router";
import {MovieData} from "@/types";
import style from './[id].module.css';
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchOneMovie from "@/lib/fetch-one-movies";

export const getServerSideProps = async(context: GetServerSidePropsContext) => {
    const id = context.params!.id;
    const movie = await fetchOneMovie(Number(id));

    return {
        props: {
            movie,
        }
    }
}
export default function Page({movie}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (!movie) return <div>영화 정보가 없습니다.</div>;

    const {
        id,
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
        <div className={style.container}>
            <div
                className={style.background_img_container}
                style={{backgroundImage: `url('${posterImgUrl}')`}}
            >
                <img src={posterImgUrl}/>
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
    );
}