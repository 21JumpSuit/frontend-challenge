import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import UserGrid from './UserGrid';
import UserTable from './UserTable';

const Challenge = () => {
    const [users, setUsers] = useState({ allUsers: [], displayedUsers: [] });
    const [isTableView, setIsTableView] = useState(false);

    const deleteUser = (email) => {
        const newUserList = users.allUsers.filter(
            (user) => user.email !== email
        );
        setUsers({ allUsers: newUserList, displayedUsers: newUserList });
    };

    const addUser = () => {
        fetch('https://randomuser.me/api/', {
            dataType: 'json',
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const newUserList = [...users.displayedUsers, ...json.results];
                setUsers({
                    allUsers: newUserList,
                    displayedUsers: newUserList,
                });
            });
    };

    const filterUsers = (filterText) => {
        const newDisplayedUsers = users.allUsers.filter(
            (user) =>
                (user.name.first + user.name.last)
                    .toString()
                    .toLowerCase()
                    .replace(/\s/g, '')
                    .indexOf(filterText.toLowerCase()) >= 0
        );
        setUsers({
            allUsers: users.allUsers,
            displayedUsers: newDisplayedUsers,
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
                setUsers({
                    allUsers: json.results,
                    displayedUsers: json.results,
                });
            });
    }, []);

    return (
        <div className='flex flex-wrap items-center justify-around min-w-full mt-6 sm:w-full'>
            <div className='p-6 mt-6 text-left border w-full rounded-xl'>
                {isTableView ? (
                    <UserTable
                        displayedUsers={users.displayedUsers}
                        deleteUser={deleteUser}
                    />
                ) : (
                    <UserGrid
                        displayedUsers={users.displayedUsers}
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
