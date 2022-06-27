import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import UserGrid from './UserGrid';
import UserTable from './UserTable';

const Challenge = () => {
    const [users, setUsers] = useState();
    const [isTableView, setIsTableView] = useState(false);

    const deleteUser = (email) => {
        setUsers(users.filter((user) => user.email !== email));
    };

    const addUser = () => {
        fetch('https://randomuser.me/api/', {
            dataType: 'json',
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setUsers([...users, ...json.results]);
            });
    };

    const switchViews = () => {
        setIsTableView(!isTableView);
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
                {isTableView ? (
                    <UserTable users={users} />
                ) : (
                    <UserGrid users={users} deleteUser={deleteUser} />
                )}
            </div>
            <button id='switcher' onClick={switchViews}>
                Switch Views
            </button>
            <button id='addition' onClick={addUser}>
                Add User
            </button>
        </div>
    );
};

export default Challenge;
