import React, { useState, useContext, useRef, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from 'uuid';
import { useClickAway } from "react-use";
import Context from '../context/context';
import '../styles/ListOfUsers.css';

export function ListOfUsers({ inputValue, setInputValue, selectedUsers, setSelectedUsers, setUserAlreadySelected, setAllUsers }) {
    const [list, setList] = useState([]);
    const [firstEl, setFirstEl] = useState(0);
    const [lastEl, setLastEl] = useState(20)
    const context = useContext(Context);
    const { usersState, searchUsers } = context;
    const scrollRef = useRef();
    useClickAway(scrollRef, () => setInputValue(''));

    useEffect(() => {
        searchUsers(inputValue);
        setFirstEl(21)
        setLastEl(30);
    }, [inputValue])

    useEffect(() => {
        setList([...usersState.filteredList.slice(0, 20)]);
    }, [usersState.filteredList])


    const fetchMoreData = () => {
        setList([...list, ...usersState.filteredList.slice(firstEl, lastEl)])
        setFirstEl(lastEl + 1)
        setLastEl(prev => prev + 5)
    };

    const chooseUser = (user) => {
        setAllUsers(false);
        if (!selectedUsers.includes(user)) {
            setSelectedUsers([...selectedUsers.filter(user => user !== 'all users are selected'), user]);
            setUserAlreadySelected(false)
        } else {
            setTimeout(function () { setUserAlreadySelected(false) }, 3000);
            setUserAlreadySelected(true)
        }
    }

    return (
        <>
            <div id="scrollableDiv" className="scrollList" ref={scrollRef}>
                <InfiniteScroll
                    dataLength={list.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={usersState.isLoading ? <h4>Loading...</h4> : <h4>No matches found</h4>}
                    scrollableTarget="scrollableDiv">
                    {list.map(user => {
                        return (<div key={uuidv4()} onClick={() => chooseUser(user)} className="listItem">{user}</div>)
                    })}
                </InfiniteScroll>
            </div>
        </>
    )
}