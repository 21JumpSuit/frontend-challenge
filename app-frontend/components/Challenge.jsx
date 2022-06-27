import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import UserGrid from './UserGrid';
import UserTable from './UserTable';

const Challenge = () => {
    const [allUsers, setAllUsers] = useState();
    const [displayedUsers, setDisplayedUsers] = useState();
    const [isTableView, setIsTableView] = useState(false);

    const deleteUser = (email) => {
        setAllUsers(displayedUsers.filter((user) => user.email !== email));
        setDisplayedUsers(allUsers);
    };

    const addUser = () => {
        fetch('https://randomuser.me/api/', {
            dataType: 'json',
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setAllUsers([...displayedUsers, ...json.results]);
                setDisplayedUsers(allUsers);
            });
    };

    const filterUsers = (filterText) => {
        setDisplayedUsers(
            allUsers.filter(
                (user) =>
                    (user.name.first + user.name.last)
                        .toString()
                        .toLowerCase()
                        .replace(/\s/g, '')
                        .indexOf(filterText.toLowerCase()) >= 0
            )
        );
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
                setAllUsers(json.results);
                setDisplayedUsers(allUsers);
            });
    }, []);

    return (
        <div className='flex flex-wrap items-center justify-around min-w-full mt-6 sm:w-full'>
            <div className='p-6 mt-6 text-left border w-full rounded-xl'>
                {isTableView ? (
                    <UserTable displayedUsers={displayedUsers ?? allUsers} />
                ) : (
                    <UserGrid
                        displayedUsers={displayedUsers ?? allUsers}
                        deleteUser={deleteUser}
                    />
                )}
            </div>
            <div>
                <label>Filter Users By Name</label>
                <input
                    type='text'
                    onChange={(e) => filterUsers(e.target.value)}
                ></input>
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
