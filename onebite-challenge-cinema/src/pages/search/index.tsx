import {useRouter} from "next/router";
import {ReactNode} from "react";
import SearchBar from "@/components/Search-bar";

export default function Page() {
    const router = useRouter();
    const {q} = router.query;

    return (
        <div>
            <SearchBar />
            {q && (
                <h2>검색 결과 : {q}</h2>
            )
            }
        </div>
    );
}
