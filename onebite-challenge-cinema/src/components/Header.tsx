import Link from "next/link";
import style from './Header.module.css';

export default function Header() {
    return (
        <header className={style.header}>
            <Link href={'/'}>
                ONEBITE CINEMA
            </Link>
        </header>
    );
}