import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export function ListOfSelectedUsers({ selectedUsers, setSelectedUsers }) {

    const deleteSelectedUser = (user) => {
        setSelectedUsers([...selectedUsers.filter(el => el !== user)])
    }

    return (
        <>
        {selectedUsers.map(user => {
            return (
                <div key={uuidv4()} className="reciever">
                <span className="deleteUserButton" onClick={() => deleteSelectedUser(user)} />
                <p>{user}</p>
            </div>
            )
        })}
        </>
    )
}
