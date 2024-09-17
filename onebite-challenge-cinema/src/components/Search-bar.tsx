import style from './Search-bar.module.css';
import {ReactNode, useState} from "react";
import {useRouter} from "next/router";

export default function SearchBar() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const {q} = router.query;


    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const onSubmit = () => {
        console.log('searchTerm', searchTerm);
        if (!searchTerm || q === searchTerm) return;
        router.push(`/search?q=${searchTerm}`);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <div className={style.searchbar_container}>
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                onKeyDown={onKeyDown}
                value={searchTerm}
                onChange={onChangeSearch}
            />
            <button onClick={onSubmit}>검색</button>
        </div>
    );

}