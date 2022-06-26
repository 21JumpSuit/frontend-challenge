import React from 'react';
import { useState, useEffect } from 'react';
import GridUsers from "./GridUsers";
import TableUsers from "./TableUsers";

const Challenge = () => {

	const [userInfos, setUserInfos] = useState([]);
	const [alluser, setAllUser] = useState([]);
	const [adduser, setAddUser] = useState(10);
	const [toggle, setToggle] = useState(true);
	const [count, setBtnClick] = useState(0)
	const errMsg="No Persons...";
	const url = `https://randomuser.me/api/?page=1&results=${adduser}`;

	const fetchUsers = async () => {
		const resp = await fetch(url);
		const users = await resp.json(); 
		const newUserInfos = [...users.results, ...userInfos];

		setUserInfos(newUserInfos);
		setAllUser(newUserInfos);
	}

	useEffect(() => {
		fetchUsers();
	}, [count])

	const handleSearchInput = (event) => {
		const value = event.target.value;
		const searchUsers = alluser.filter((user) =>
			`${user.name.first} ${user.name.last}`
				.toLowerCase()
				.includes(value.toLowerCase())
		);
		setUserInfos(searchUsers);
	};

	const handleButtonClick = () => {
		setBtnClick(count + 1);
		setAddUser(1);
	}

	const deleteUser = (arrI) => {
		setUserInfos(userInfos.filter((i, index) => index !== arrI));
		
	};

	const triggerToggle = () => {
		setToggle(!toggle);
	};

	const fullName = userInfos.map((user) => {
		return user.name.first + ' ' + user.name.last;
	})

	return (
		<div className='flex flex-wrap items-center justify-around min-w-full mt-6 sm:w-full'>
			<div className='p-6 mt-6 text-left border w-full rounded-xl'>


				<div className="ml-auto flex items-center">
					<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

						<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
						<div className="relative">
							<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
								<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
							</div>
							<input onChange={handleSearchInput} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users..." />
						</div>


						<label  className="inline-flex relative items-center cursor-pointer">
							<input type="checkbox" value="" id="default-toggle" className="sr-only peer" onClick={() => triggerToggle()} />
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{toggle? 'Grid View':'Table View'}</span>
						</label>
						<span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
						<button onClick={() => handleButtonClick()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Add another user
						</button>

					</div>
				</div>
				{
					toggle ? <GridUsers userInfos={userInfos} delete={deleteUser} fullName={fullName} errMsg={errMsg}/> :
						<TableUsers userInfos={userInfos} delete={deleteUser} fullName={fullName} errMsg={errMsg}/>
				}
			</div>
		</div>
	)
};

export default Challenge;
