import {ReactNode} from "react";
import style from './global-layout.module.css';
import Header from "@/components/Header";

export default function GlobalLayout({children}: {
    children: ReactNode
}) {
    return (
        <div className={style.container}>
            <Header/>
            <main className={style.main}>
                {children}
            </main>
            <footer></footer>
        </div>
    );
}