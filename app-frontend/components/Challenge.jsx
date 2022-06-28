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
            <div className='flex m-3 space-x-4'>
                <div className='bg-sky-500 p-2 rounded shadow-md shadow-slate-500'>
                    <label className='mr-1'>Filter Users By Name</label>
                    <input
                        className='shadow-inner'
                        type='text'
                        onChange={(e) => filterUsers(e.target.value)}
                    ></input>
                </div>
                <button
                    className='bg-sky-500 p-2 rounded shadow-md shadow-slate-500'
                    id='switcher'
                    onClick={switchViews}
                >
                    Switch Views
                </button>
                <button
                    className='bg-sky-500 p-2 rounded shadow-md shadow-slate-500'
                    id='addition'
                    onClick={addUser}
                >
                    Add User
                </button>
            </div>
        </div>
    );
};

export default Challenge;
