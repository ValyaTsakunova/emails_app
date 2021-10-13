import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

export function ListOfUsers() {
    const [list, setList] = useState(Array.from({ length: 40 }));
    const fetchMoreData = () => {
       
            setList([...list, Array.from({ length: 5 })]);
            console.log(list.length)
       
    };

    return (
        <>
            <InfiniteScroll
                dataLength={list.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
            >
                {list.map((i, index) => (
                    <div key={index}>
                        div - #{i}
                    </div>
                ))}
            </InfiniteScroll>

        </>
    )
}