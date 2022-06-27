import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import UserGrid from './UserGrid';

const Challenge = () => {
    const [users, setUsers] = useState();

    const deleteUser = (email) => {
        setUsers(users.filter((user) => user.email !== email));
    };

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=10', {
            dataType: 'json',
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setUsers(json.results);
            });
    }, []);

    return (
        <div className='flex flex-wrap items-center justify-around min-w-full mt-6 sm:w-full'>
            <div className='p-6 mt-6 text-left border w-full rounded-xl'>
                <UserGrid users={users} deleteUser={deleteUser} />
            </div>
            <button id='switcher'>Switch Views</button>
            <button id='addition'>Add User</button>
        </div>
    );
};

export default Challenge;
